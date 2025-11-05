/**
 * 🇻🇳 Middleware xác thực JWT token
 * 🇻🇳 Kiểm tra token trong header Authorization hoặc cookie
 * 🇻🇳 Tự động refresh token nếu accessToken hết hạn
 */
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import {
  HTTP_STATUS,
  JWT_CONFIG,
  getCookieOptions,
} from "../utils/constants.js";
import { JwtService } from "../services/jwtService.js";

/**
 * 🇻🇳 Middleware xác thực JWT token
 * 🇻🇳 Kiểm tra token trong cookie hoặc header Authorization
 * 🇻🇳 Tự động refresh token nếu accessToken hết hạn
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // 🇻🇳 Lấy token từ cookie hoặc header Authorization
    let token = req.cookies.accessToken;

    // 🇻🇳 Nếu không có token trong cookie, thử lấy từ header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    // Nếu không có token, trả về lỗi unauthorized
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Token không được cung cấp",
      });
    }

    try {
      // 🇻🇳 Xác thực token
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);

      // 🇻🇳 Tìm user trong database (không bao gồm password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Token không hợp lệ - User không tồn tại",
        });
      }

      // 🇻🇳 Kiểm tra tài khoản có đang hoạt động không
      if (!user.isActive) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Tài khoản đã bị vô hiệu hóa",
        });
      }

      // 🇻🇳 Lưu thông tin user vào request để sử dụng ở các middleware/controller tiếp theo
      req.user = user;
      req.userId = user._id;

      next();
    } catch (accessTokenError) {
      // 🇻🇳 Access token không hợp lệ hoặc đã hết hạn
      if (
        accessTokenError.name === "TokenExpiredError" ||
        accessTokenError.name === "JsonWebTokenError"
      ) {
        // 🇻🇳 Kiểm tra refreshToken
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "Token đã hết hạn",
          });
        }

        try {
          // 🇻🇳 Kiểm tra refreshToken
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            JWT_CONFIG.REFRESH_SECRET
          );

          // 🇻🇳 Tìm user trong database (không bao gồm password)
          const user = await User.findById(decodedRefreshToken.id).select(
            "-password"
          );

          if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
              success: false,
              message: "Token không hợp lệ - User không tồn tại",
            });
          }

          // 🇻🇳 Kiểm tra tài khoản có đang hoạt động không
          if (!user.isActive) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
              success: false,
              message: "Tài khoản đã bị vô hiệu hóa",
            });
          }

          // 🇻🇳 RefreshToken hợp lệ, tạo accessToken mới
          const jwtService = new JwtService();
          const newTokens = await jwtService.createTokenJwt(user.email);

          if (!newTokens) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
              success: false,
              message: "Không thể tạo token mới",
            });
          }

          // 🇻🇳 Thiết lập cookie accessToken và refreshToken mới
          const cookieOptions = getCookieOptions();
          res.cookie("accessToken", newTokens.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000, // 🇻🇳 15 phút
          });
          res.cookie("refreshToken", newTokens.refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 🇻🇳 7 ngày
          });

          // 🇻🇳 Lưu thông tin user vào request để sử dụng ở các middleware/controller tiếp theo
          req.user = user;
          req.userId = user._id;

          next();
        } catch (refreshTokenError) {
          // 🇻🇳 RefreshToken cũng đã hết hạn hoặc không hợp lệ
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "Token đã hết hạn",
          });
        }
      } else {
        throw accessTokenError;
      }
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Lỗi xác thực",
    });
  }
};

/**
 * 🇻🇳 Middleware kiểm tra quyền admin
 * 🇻🇳 Phải được sử dụng sau authMiddleware
 * 🇻🇳 Chỉ cho phép user có role = "admin" truy cập
 */
export const adminMiddleware = (req, res, next) => {
  try {
    // 🇻🇳 Kiểm tra đã xác thực chưa
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

    // 🇻🇳 Kiểm tra quyền admin
    if (req.user.role !== "admin") {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Không có quyền truy cập - Cần quyền admin",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Lỗi kiểm tra quyền",
    });
  }
};

/**
 * 🇻🇳 Middleware kiểm tra quyền user hoặc admin
 * 🇻🇳 Cho phép user truy cập tài nguyên của chính họ hoặc admin truy cập tất cả
 */
export const userOrAdminMiddleware = (req, res, next) => {
  try {
    // 🇻🇳 Kiểm tra đã xác thực chưa
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

    const { id } = req.params;
    const userId = req.user._id.toString();

    // 🇻🇳 Admin có thể truy cập tất cả
    if (req.user.role === "admin") {
      return next();
    }

    // 🇻🇳 User chỉ có thể truy cập tài nguyên của chính họ
    if (userId !== id) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Không có quyền truy cập tài nguyên này",
      });
    }

    next();
  } catch (error) {
    console.error("User or admin middleware error:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Lỗi kiểm tra quyền",
    });
  }
};

/**
 * 🇻🇳 Middleware xác thực tùy chọn
 * 🇻🇳 Không bắt buộc phải có token, nhưng nếu có thì sẽ xác thực
 * 🇻🇳 Hữu ích cho các route công khai nhưng vẫn muốn biết user nếu đã đăng nhập
 */
export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    // 🇻🇳 Lấy token từ cookie hoặc header
    let token = req.cookies.accessToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    // 🇻🇳 Không có token, tiếp tục mà không xác thực
    if (!token) {
      return next();
    }

    try {
      // 🇻🇳 Thử xác thực token và lấy thông tin user
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
      const user = await User.findById(decoded.id).select("-password");

      // 🇻🇳 Nếu user hợp lệ và đang hoạt động, lưu vào request
      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id;
      }
    } catch (error) {
      // 🇻🇳 Token không hợp lệ, nhưng vẫn tiếp tục (không bắt buộc)
      console.log(
        "Optional auth: Invalid token, continuing without authentication"
      );
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    // 🇻🇳 Tiếp tục ngay cả khi có lỗi (optional auth)
    next();
  }
};

/**
 * 🇻🇳 Middleware kiểm tra tài khoản đang hoạt động
 * 🇻🇳 Đảm bảo user đã xác thực và tài khoản đang active
 */
export const activeUserMiddleware = (req, res, next) => {
  try {
    // 🇻🇳 Kiểm tra đã xác thực chưa
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

    // 🇻🇳 Kiểm tra tài khoản có đang hoạt động không
    if (!req.user.isActive) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: "Tài khoản đã bị vô hiệu hóa",
      });
    }

    next();
  } catch (error) {
    console.error("Active user middleware error:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Lỗi kiểm tra trạng thái tài khoản",
    });
  }
};

/**
 * 🇻🇳 Utility function để tạo JWT token
 * 🇻🇳 Tạo token với thông tin userId
 * @param {string} userId - ID của user
 * @returns {string} JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_CONFIG.SECRET, {
    expiresIn: JWT_CONFIG.EXPIRES_IN,
  });
};

/**
 * 🇻🇳 Utility function để xác thực token (không phải middleware)
 * 🇻🇳 Giải mã và xác thực JWT token
 * @param {string} token - JWT token cần xác thực
 * @returns {object} Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_CONFIG.SECRET);
  } catch (error) {
    throw error;
  }
};
