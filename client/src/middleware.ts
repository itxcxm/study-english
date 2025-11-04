import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// 🔑 Secret phải trùng với backend
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "study-english");

// 🧭 Danh sách route cần đăng nhập
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // --- 1️⃣ Nếu người dùng vào /login hoặc /register ---
  if (pathname === "/login" || pathname === "/register") {
    // Nếu có accessToken, thử verify để redirect về dashboard
    if (accessToken) {
      try {
        await jwtVerify(accessToken, SECRET);
        // ✅ Token hợp lệ => redirect sang dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch {
        // ❌ Token hết hạn hoặc sai, nhưng có refreshToken => cho vào trang (API interceptor sẽ handle)
        // Nếu không có refreshToken => cho vào trang bình thường
        return NextResponse.next();
      }
    }
    // ❌ Không có token => cho vào trang bình thường
    return NextResponse.next();
  }

  // --- 2️⃣ Nếu route không được bảo vệ => cho qua ---
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // --- 3️⃣ Nếu route được bảo vệ ---
  // ✅ Với cross-domain cookies, middleware chỉ nên check sự tồn tại của cookies
  // ✅ Để API interceptor xử lý verify và refresh token
  // ✅ Nếu có refreshToken hoặc accessToken, cho phép vào (API interceptor sẽ verify)
  
  if (!accessToken && !refreshToken) {
    // ❌ Không có cả accessToken và refreshToken => về login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Có ít nhất một trong hai cookies => cho phép vào
  // ✅ API interceptor sẽ tự động verify và refresh token nếu cần
  // ✅ Với cross-domain cookies, middleware không nên verify token (có thể không đọc được cookies)
  
  return NextResponse.next();
}

// ⚙️ Áp dụng middleware cho các route cụ thể
export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile/:path*",
    "/dashboard/:path*",
    "/admin/:path*"
  ],
};
