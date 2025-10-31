import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// 🔑 Secret phải trùng với backend
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "study-english");

// 🧭 Danh sách route cần đăng nhập
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  // --- 1️⃣ Nếu người dùng vào /login hoặc /register ---
  if (pathname === "/login" || pathname === "/register") {
    // Nếu có token => kiểm tra hợp lệ
    if (token) {
      try {
        await jwtVerify(token, SECRET);
        // ✅ Token hợp lệ => redirect sang dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch {
        // ❌ Token lỗi => cho vào trang bình thường
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
  const refreshToken = req.cookies.get("refreshToken")?.value;
  
  if (!token && !refreshToken) {
    // ❌ Không có cả accessToken và refreshToken => về login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Nếu có token, thử verify
  if (token) {
    try {
      // ✅ Verify token và lấy payload
      const { payload } = await jwtVerify(token, SECRET);
      
      // --- 4️⃣ Kiểm tra quyền admin cho route /admin ---
      if (pathname.startsWith("/admin")) {
        if (payload.role !== "admin") {
          // ❌ Không phải admin => về trang chủ
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
      
      return NextResponse.next();
    } catch {
      // ❌ AccessToken hết hạn hoặc sai, kiểm tra refreshToken
      if (refreshToken) {
        // ✅ Có refreshToken => cho phép vào (API interceptor sẽ handle refresh)
        return NextResponse.next();
      }
      // ❌ Không có refreshToken => về login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Không có accessToken nhưng có refreshToken => cho phép vào (API interceptor sẽ handle refresh)
  if (refreshToken) {
    return NextResponse.next();
  }
  
  // Fallback: về login
  return NextResponse.redirect(new URL("/login", req.url));
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
