/**
 * Enum định nghĩa các vai trò của user trong hệ thống
 * Sử dụng để phân quyền và kiểm soát truy cập
 */
export enum UserRole {
    ADMIN = 'admin',         // Quản trị viên - có quyền cao nhất
    USER = 'user',           // Người dùng thông thường
    MODERATOR = 'moderator'  // Điều hành viên - có quyền trung bình
}

/**
 * Enum định nghĩa các trạng thái của sản phẩm
 * Sử dụng để quản lý trạng thái hiển thị và bán hàng
 */
export enum ProductStatus {
    ACTIVE = 'active',       // Đang hoạt động - có thể bán
    INACTIVE = 'inactive',   // Tạm ngưng - không hiển thị
    DELETED = 'deleted'       // Đã xóa - không thể khôi phục
}

/**
 * Các mã trạng thái HTTP chuẩn
 * Sử dụng để trả về response code cho client
 */
export const HTTP_STATUS = {
    OK: 200,                    // Thành công
    CREATED: 201,               // Tạo mới thành công
    BAD_REQUEST: 400,           // Yêu cầu không hợp lệ
    UNAUTHORIZED: 401,          // Chưa xác thực
    FORBIDDEN: 403,             // Không có quyền truy cập
    NOT_FOUND: 404,             // Không tìm thấy
    INTERNAL_SERVER_ERROR: 500  // Lỗi server
};

/**
 * Cấu hình JWT (JSON Web Token)
 * Sử dụng để tạo và xác thực token
 */
export const JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET || 'your-secret-key',  // Secret key để ký token
    EXPIRES_IN: '7d'                                      // Thời gian hết hạn token
};
  