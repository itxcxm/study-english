import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/profile", "/dashboard"];

// JWT secret - phải trùng với backend
const JWT_SECRET = new TextEncoder().encode("access_secret");

// 👇 middleware chạy cho mọi request
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Nếu không phải route cần bảo vệ → cho phép
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Lấy accessToken từ cookie (httpOnly vẫn đọc được trên server)
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    // Không có token → chuyển hướng login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // ✅ Xác thực token sử dụng jose (Edge Runtime compatible)
    await jwtVerify(accessToken, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    // ❌ Token hết hạn hoặc không hợp lệ
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// ✅ Cấu hình để middleware chỉ chạy ở các route nhất định
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],
};
