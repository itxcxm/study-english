import api from "./api";

// Kiểm tra trạng thái đăng nhập và trả về thông tin user
export const checkAuth = async (setIsAuthenticated: (authenticated: boolean) => void) => {
    try {
      const response = await api.get("/auth/check");
      setIsAuthenticated(response.data.authenticated || false);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

// Kiểm tra quyền admin và trả về thông tin user
export const checkAdminRole = async (): Promise<{ isAdmin: boolean; user: any | null }> => {
  try {
    const response = await api.get("/auth/check");
    
    if (response.data.success && response.data.authenticated) {
      const user = response.data.user;
      const isAdmin = user?.role === "admin";
      return { isAdmin, user };
    }
    
    return { isAdmin: false, user: null };
  } catch (error) {
    return { isAdmin: false, user: null };
  }
};