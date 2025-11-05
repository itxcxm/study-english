/**
 * 🇻🇳 File chứa các constants và cấu hình chung cho ứng dụng
 * 🇻🇳 Định nghĩa mã trạng thái HTTP, cấu hình JWT và cookie options
 */
// 🇻🇳 Tải biến môi trường từ .env
import dotenv from "dotenv";
dotenv.config();

// 🇻🇳 Các mã trạng thái HTTP thường dùng
export const HTTP_STATUS = {
  OK: 200, // 🇻🇳 Thành công
  CREATED: 201, // 🇻🇳 Đã tạo thành công
  BAD_REQUEST: 400, // 🇻🇳 Yêu cầu không hợp lệ
  UNAUTHORIZED: 401, // 🇻🇳 Chưa xác thực
  FORBIDDEN: 403, // 🇻🇳 Không có quyền truy cập
  NOT_FOUND: 404, // 🇻🇳 Không tìm thấy
  CONFLICT: 409, // 🇻🇳 Xung đột dữ liệu
  INTERNAL_SERVER_ERROR: 500, // 🇻🇳 Lỗi server
};

// 🇻🇳 Thiết lập cấu hình cho JWT
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || "study-english", // 🇻🇳 Chuỗi bí mật cho access token JWT
  REFRESH_SECRET: process.env.REFRESH_SECRET || "study-english", // 🇻🇳 Chuỗi bí mật cho refresh token JWT
  EXPIRES_IN: "7d", // 🇻🇳 Thời gian hết hạn token
  EXPIRES_IN_REFRESH: "7d", // 🇻🇳 Thời gian hết hạn refresh token
};

/**
 * 🇻🇳 Cookie configuration helper
 * 🇻🇳 Tạo cấu hình cookie tùy theo môi trường (production/development)
 * 🇻🇳 Trong production: sameSite: "None", secure: true (cho cross-domain)
 * 🇻🇳 Trong development: sameSite: "Lax", secure: false (cho same-domain)
 * @returns {object} Cấu hình cookie options
 */
export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  // 🇻🇳 Trong production (cross-domain): cần sameSite: "None" và secure: true
  // 🇻🇳 Trong development (same domain): có thể dùng sameSite: "Lax" hoặc "Strict"
  return {
    httpOnly: true, // 🇻🇳 Không cho JavaScript truy cập cookie (bảo mật)
    secure: isProduction, // 🇻🇳 Bắt buộc true khi sameSite: "None" (chỉ gửi qua HTTPS)
    sameSite: isProduction ? "None" : "Lax", // 🇻🇳 "None" cho cross-domain, "Lax" cho same-domain
    path: "/", // 🇻🇳 Đảm bảo cookies được gửi cho mọi path
    // 🇻🇳 Không set domain để cookies có thể được gửi cho bất kỳ domain nào (với sameSite: "None")
  };
};
