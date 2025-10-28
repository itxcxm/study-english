import axios from "axios";

// Tạo instance axios với cấu hình backend và gửi cookie (credentials)
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Địa chỉ backend với prefix /api
  withCredentials: true, // Cho phép gửi cookie qua HTTP request
});

// Interceptor response: Tự động xử lý khi token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu response báo lỗi 403 (hết hạn/hết quyền) và chưa thử refresh
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã thử refresh tránh lặp vô tận
      try {
        // Gọi API refresh token
        await api.post("/auth/refresh");
        // Thử lại request ban đầu (lúc này token mới đã được backend gửi về cookie)
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh thất bại thì hiện lỗi
        console.error("Không thể refresh token:", refreshError);
      }
    }

    // Nếu không xử lý được thì trả lỗi cho phía gọi tiếp tục xử lý
    return Promise.reject(error);
  }
);

export default api;
