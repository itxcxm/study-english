import axios, { AxiosError } from "axios";

// Tạo instance axios với cấu hình backend và gửi cookie (credentials)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api", // Địa chỉ backend với prefix /api
  withCredentials: true, // Cho phép gửi cookie qua HTTP request
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
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/check`,
          {
            withCredentials: true,
          }
        );

        // Nếu refresh thành công, xử lý queue và retry request ban đầu
        if (response.data.success && response.data.authenticated) {
          processQueue(null, null);
          return api(originalRequest);
        } else {
          // Refresh token cũng đã hết hạn, logout
          throw new Error("Refresh token expired");
        }
      } catch (refreshError) {
        // Refresh token đã hết hạn, logout user
        processQueue(refreshError as AxiosError, null);
        
        // Xóa cookies và redirect về login
        if (typeof window !== "undefined") {
          // Gọi logout endpoint để xóa cookies
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/auth/logout`,
              {},
              { withCredentials: true }
            );
          } catch (logoutError) {
            // Ignore logout errors
          }
          
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
