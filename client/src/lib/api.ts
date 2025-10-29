import axios from "axios";

// Tạo instance axios với cấu hình backend và gửi cookie (credentials)
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Địa chỉ backend với prefix /api
  withCredentials: true, // Cho phép gửi cookie qua HTTP request
});

export default api;
