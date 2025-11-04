import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// 🇻🇳 🔑 Secret để verify JWT phải giống với server backend
// 🇻🇳 ⚠️ Trong môi trường production, cần đặt JWT_SECRET trong biến môi trường của Vercel
const isProduction = process.env.NODE_ENV === "production";
const JWT_SECRET = process.env.JWT_SECRET || (isProduction ? null : "study-english");

// 🇻🇳 ⚠️ Cảnh báo nếu thiếu JWT_SECRET trong production (chỉ cảnh báo, không chặn)
if (isProduction && !JWT_SECRET) {
  console.warn(
    "⚠️ CẢNH BÁO: JWT_SECRET chưa được thiết lập ở môi trường production. " +
    "Vui lòng bổ sung JWT_SECRET vào biến môi trường của Vercel để giống với backend."
  );
}

// 🇻🇳 Mã hóa secret dùng cho jwtVerify
const SECRET = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null;

// 🇻🇳 Các route cần đăng nhập mới truy cập được
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // 🇻🇳 Đọc cookie accessToken/refreshToken (ở production, cross-domain có thể không đọc được)
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // 🇻🇳 #1: Nếu truy cập /login hoặc /register
  if (pathname === "/login" || pathname === "/register") {
    // 🇻🇳 Nếu đã có accessToken & SECRET, thử verify để redirect sang dashboard
    if (accessToken && SECRET) {
      try {
        await jwtVerify(accessToken, SECRET);
        // 🇻🇳 Token hợp lệ, chuyển hướng về dashboard
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
      } catch (error) {
        // 🇻🇳 Token hết hạn/sai, nếu còn refreshToken thì cho vào, API interceptor sẽ tự xử lý tiếp
        // 🇻🇳 Không có refreshToken cũng cho vào đăng nhập lại
        return NextResponse.next();
      }
    }
    // 🇻🇳 Không có token hoặc không đọc được cookie/SECRET thì cho truy cập bình thường
    // 🇻🇳 Ở production cross-domain, có thể không đọc được cookie => cho truy cập
    return NextResponse.next();
  }

  // 🇻🇳 #2: Nếu không phải các route cần bảo vệ => cho truy cập qua
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🇻🇳 #3: Với route cần đăng nhập
  // 🇻🇳 Ở production cross-domain, middleware chỉ nên kiểm tra có tồn tại cookies hay không
  // 🇻🇳 Việc xác thực, refresh thực hiện ở interceptor/API sau đó
  
  // 🇻🇳 Kiểm tra existence token xác thực
  const hasAccessToken = !!accessToken;
  const hasRefreshToken = !!refreshToken;
  
  if (!hasAccessToken && !hasRefreshToken) {
    // 🇻🇳 Không có accessToken cũng không có refreshToken
    // 🇻🇳 Development (cùng domain): luôn chuyển hướng sang /login nếu vắng cookie
    // 🇻🇳 Production (cross-domain): có thể không đọc được cookie, giao cho interceptor xử lý
    if (!isProduction) {
      // 🇻🇳 Dev: chặc chẽ — chuyển hướng sang /login nếu thiếu cookies
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    // 🇻🇳 Production: nương tay, cho truy cập và để client tự xác thực qua API /auth/check
    // 🇻🇳 Interceptor phía client sẽ tự redirect nếu thất bại
  }

  // 🇻🇳 Đã có ít nhất một trong hai cookies, hoặc là production (không chặt chẽ check cookies) => cho phép qua
  // 🇻🇳 Interceptor sẽ tự xử lý xác thực, refresh token phía client khi cần thiết
  // 🇻🇳 Không nên cố xác thực JWT ở middleware nếu cross-domain (vì đọc cookie có thể thất bại)
  
  return NextResponse.next();
}

// 🇻🇳 ⚙️ Dùng middleware cho các route cụ thể dưới đây
export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile/:path*",
    "/dashboard/:path*",
    "/admin/:path*"
  ],
};
