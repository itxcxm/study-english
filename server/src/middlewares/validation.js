import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Middleware kiểm tra dữ liệu đầu vào cho đăng ký user
 */
export const validateRegister = (req, res, next) => {
  const { email, password, name } = req.body;
  const errors = [];

  // Kiểm tra email
  if (!email) {
    errors.push("Email là bắt buộc");
  } else if (!isValidEmail(email)) {
    errors.push("Email không hợp lệ");
  }

  // Kiểm tra password
  if (!password) {
    errors.push("Mật khẩu là bắt buộc");
  } else if (password.length < 6) {
    errors.push("Mật khẩu phải có ít nhất 6 ký tự");
  }

  // Kiểm tra tên
  if (!name) {
    errors.push("Tên là bắt buộc");
  } else if (name.trim().length < 2) {
    errors.push("Tên phải có ít nhất 2 ký tự");
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors,
    });
  }

  next();
};

/**
 * Middleware kiểm tra dữ liệu đầu vào cho đăng nhập
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Kiểm tra email
  if (!email) {
    errors.push("Email là bắt buộc");
  } else if (!isValidEmail(email)) {
    errors.push("Email không hợp lệ");
  }

  // Kiểm tra password
  if (!password) {
    errors.push("Mật khẩu là bắt buộc");
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors,
    });
  }

  next();
};

/**
 * Middleware kiểm tra dữ liệu đầu vào cho cập nhật user
 */
export const validateUpdateUser = (req, res, next) => {
  const { email, name, role } = req.body;
  const errors = [];

  // Kiểm tra email (nếu có)
  if (email && !isValidEmail(email)) {
    errors.push("Email không hợp lệ");
  }

  // Kiểm tra tên (nếu có)
  if (name && name.trim().length < 2) {
    errors.push("Tên phải có ít nhất 2 ký tự");
  }

  // Kiểm tra role (nếu có)
  if (role && !["user", "admin"].includes(role)) {
    errors.push("Role phải là user hoặc admin");
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors,
    });
  }

  next();
};

/**
 * Middleware kiểm tra dữ liệu đầu vào cho thay đổi mật khẩu
 */
export const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];

  // Kiểm tra mật khẩu hiện tại
  if (!currentPassword) {
    errors.push("Mật khẩu hiện tại là bắt buộc");
  }

  // Kiểm tra mật khẩu mới
  if (!newPassword) {
    errors.push("Mật khẩu mới là bắt buộc");
  } else if (newPassword.length < 6) {
    errors.push("Mật khẩu mới phải có ít nhất 6 ký tự");
  }

  if (errors.length > 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Dữ liệu đầu vào không hợp lệ",
      errors,
    });
  }

  next();
};

/**
 * Middleware kiểm tra ID parameter
 */
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "ID là bắt buộc",
    });
  }

  // Kiểm tra định dạng ObjectId của MongoDB
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "ID không hợp lệ",
    });
  }

  next();
};

/**
 * Middleware kiểm tra pagination parameters
 */
export const validatePagination = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  if (pageNum < 1) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Trang phải lớn hơn 0",
    });
  }

  if (limitNum < 1 || limitNum > 100) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Giới hạn phải từ 1 đến 100",
    });
  }

  // Lưu các giá trị đã validate vào request
  req.pagination = {
    page: pageNum,
    limit: limitNum,
    skip: (pageNum - 1) * limitNum,
  };

  next();
};

/**
 * Utility function kiểm tra email hợp lệ
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Middleware kiểm tra dữ liệu đầu vào cho tìm kiếm
 */
export const validateSearch = (req, res, next) => {
  const { q, sortBy, sortOrder } = req.query;

  // Kiểm tra sortBy
  if (sortBy && !["name", "email", "createdAt", "updatedAt"].includes(sortBy)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Trường sắp xếp không hợp lệ",
    });
  }

  // Kiểm tra sortOrder
  if (sortOrder && !["asc", "desc"].includes(sortOrder)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Thứ tự sắp xếp phải là asc hoặc desc",
    });
  }

  // Lưu các giá trị đã validate vào request
  req.search = {
    query: q || "",
    sortBy: sortBy || "createdAt",
    sortOrder: sortOrder || "desc",
  };

  next();
};
