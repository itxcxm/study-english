import api from "./api";

/**
 * Hàm logout và chuyển hướng về trang login
 * Cookies sẽ được xóa bởi server khi gọi logout endpoint
 */
const handleLogout = async () => {
  try {
    // ✅ Gọi logout endpoint - cookies sẽ được xóa tự động bởi server
    // withCredentials: true đã được set trong api instance
    await api.post("/auth/logout");
  } catch (error) {
    // Bỏ qua lỗi logout - có thể cookies đã bị xóa hoặc server không phản hồi
    console.warn("Yêu cầu logout thất bại, nhưng vẫn tiếp tục chuyển hướng:", error);
  }
  // Chuyển hướng về trang login
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

/**
 * Kiểm tra trạng thái đăng nhập và trả về thông tin user
 * Cookies (accessToken, refreshToken) được gửi tự động với request
 * API interceptor sẽ tự động refresh token nếu accessToken hết hạn
 */
export const checkAuth = async (setIsAuthenticated: (authenticated: boolean) => void) => {
  try {
    // ✅ Cookies được gửi tự động với withCredentials: true
    const response = await api.get("/auth/check");
    // API interceptor sẽ tự động refresh token nếu accessToken hết hạn
    setIsAuthenticated(response.data.authenticated || false);
  } catch (error: any) {
    // Kiểm tra nếu lỗi là do tài khoản bị vô hiệu hóa (status 403)
    if (error.response?.status === 403) {
      // Tài khoản bị vô hiệu hóa, logout và chuyển về login
      await handleLogout();
      setIsAuthenticated(false);
      return;
    }
    // Nếu là 401, có thể là:
    // 1. API interceptor đang refresh token (đang xử lý)
    // 2. Hoặc cả accessToken và refreshToken đều hết hạn (đã logout)
    // Để an toàn, set authenticated = false
    // Nếu API interceptor refresh thành công, sẽ có request khác và set lại authenticated
    setIsAuthenticated(false);
  }
};

/**
 * Kiểm tra quyền admin và trả về thông tin user
 * Cookies (accessToken, refreshToken) được gửi tự động với request
 * API interceptor sẽ tự động refresh token nếu accessToken hết hạn
 */
export const checkAdminRole = async (): Promise<{ isAdmin: boolean; user: any | null }> => {
  try {
    // ✅ Cookies được gửi tự động với withCredentials: true
    const response = await api.get("/auth/check");
    // API interceptor sẽ tự động refresh token nếu accessToken hết hạn
    
    if (response.data.success && response.data.authenticated) {
      const user = response.data.user;
      const isAdmin = user?.role === "admin";
      return { isAdmin, user };
    }
    
    return { isAdmin: false, user: null };
  } catch (error: any) {
    // Kiểm tra nếu lỗi là do tài khoản bị vô hiệu hóa (status 403)
    if (error.response?.status === 403) {
      // Tài khoản bị vô hiệu hóa, logout và chuyển về login
      await handleLogout();
      return { isAdmin: false, user: null };
    }
    // Nếu là 401, API interceptor đã xử lý refresh hoặc logout
    return { isAdmin: false, user: null };
  }
};