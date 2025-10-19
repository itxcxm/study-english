// Tải biến môi trường từ .env
import dotenv from "dotenv"
dotenv.config()

// Các mã trạng thái HTTP thường dùng
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

// Thiết lập cấu hình cho JWT
export const JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET || 'study-english',    // Chuỗi bí mật cho JWT
    EXPIRES_IN: '7d'                                      // Thời gian hết hạn token
};