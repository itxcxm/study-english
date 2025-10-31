import api from "./api";

// Hàm logout và chuyển hướng về trang login
const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // Ignore logout errors
  }
  // Redirect to login page
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// Kiểm tra trạng thái đăng nhập và trả về thông tin user
export const checkAuth = async (setIsAuthenticated: (authenticated: boolean) => void) => {
  try {
    const response = await api.get("/auth/check");
    // API interceptor sẽ tự động refresh token nếu accessToken hết hạn
    setIsAuthenticated(response.data.authenticated || false);
  } catch (error: any) {
    // Kiểm tra nếu lỗi là do tài khoản bị vô hiệu hóa (status 403)
    if (error.response?.status === 403) {
      // Tài khoản bị vô hiệu hóa, logout và chuyển về login
      await handleLogout();
      return;
    }
    // Nếu là 401, API interceptor đã xử lý refresh hoặc logout
    // Chỉ set authenticated = false nếu không phải là lỗi token
    if (error.response?.status !== 401) {
      setIsAuthenticated(false);
    }
  }
};

// Kiểm tra quyền admin và trả về thông tin user
export const checkAdminRole = async (): Promise<{ isAdmin: boolean; user: any | null }> => {
  try {
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