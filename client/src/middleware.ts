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
  if (!token) {
    // ❌ Không có token => về login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Token hợp lệ => cho phép
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    // ❌ Token hết hạn hoặc sai => về login
    return NextResponse.redirect(new URL("/login", req.url));
  }
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
