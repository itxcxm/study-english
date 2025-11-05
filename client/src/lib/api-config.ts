/**
 * 🇻🇳 Tiện ích cấu hình API
 * 🇻🇳 Xử lý URL cơ sở của API cho môi trường development và production
 */

/**
 * 🇻🇳 Lấy URL cơ sở của API
 * 🇻🇳 Trong môi trường production, cần thiết lập biến môi trường NEXT_PUBLIC_API_URL
 * 🇻🇳 Mặc định sẽ sử dụng localhost cho môi trường development
 */
export function getApiBaseUrl(): string {
  // 🇻🇳 Trong production, NEXT_PUBLIC_API_URL nên được thiết lập với URL API production
  // 🇻🇳 Ví dụ: https://api.yourdomain.com/api
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 🇻🇳 Mặc định cho môi trường development
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000/api";
  }

  // 🇻🇳 Mặc định cho production - không nên chạy đến đây nếu biến môi trường được cấu hình đúng
  // 🇻🇳 Đây là lớp bảo vệ sẽ gây lỗi nếu không được cấu hình đúng
  console.error(
    "⚠️ NEXT_PUBLIC_API_URL chưa được thiết lập! Vui lòng cấu hình nó trong biến môi trường."
  );
  return "";
}

/**
 * 🇻🇳 Kiểm tra xem có đang ở môi trường production không
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

