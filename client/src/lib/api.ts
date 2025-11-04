import axios, { AxiosError } from "axios";

/**
 * Axios instance với cấu hình cho cookie-based authentication
 * 
 * Cấu hình Cookie (Server):
 * - Production: sameSite: "None", secure: true (cross-domain)
 * - Development: sameSite: "Lax", secure: false (same-domain)
 * 
 * Cấu hình Client:
 * - withCredentials: true - Bắt buộc để gửi cookies với cross-domain requests
 * - Cookies được gửi tự động với mọi request
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api", // Địa chỉ backend với prefix /api
  withCredentials: true, // ✅ Bắt buộc: Cho phép gửi cookie qua HTTP request (cross-domain)
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag để tránh vòng lặp vô hạn khi refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Interceptor để xử lý response và refresh token khi accessToken hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Nếu lỗi là 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đợi và retry lại request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi endpoint check auth để refresh token
        // ✅ Sử dụng axios instance riêng với withCredentials để đảm bảo cookies được gửi
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/check`,
          {
            withCredentials: true, // ✅ Quan trọng: Gửi cookies với request
          }
        );

        // Nếu refresh thành công, xử lý queue và retry request ban đầu
        if (response.data.success && response.data.authenticated) {
          processQueue(null, null);
          return api(originalRequest);
        } else {
          // Refresh token cũng đã hết hạn, đăng xuất
          throw new Error("Refresh token đã hết hạn");
        }
      } catch (refreshError) {
        // Refresh token đã hết hạn, đăng xuất người dùng
        processQueue(refreshError as AxiosError, null);
        
        // Xóa cookies và chuyển hướng về login
        if (typeof window !== "undefined") {
          // Gọi logout endpoint để xóa cookies trên server
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/logout`,
              {},
              { 
                withCredentials: true, // ✅ Quan trọng: Gửi cookies để server có thể xóa
              }
            );
          } catch (logoutError) {
            // Bỏ qua lỗi logout - có thể cookies đã bị xóa hoặc server không phản hồi
            console.warn("Yêu cầu logout thất bại, nhưng vẫn tiếp tục chuyển hướng:", logoutError);
          }
          
          // Chuyển hướng về trang login
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
