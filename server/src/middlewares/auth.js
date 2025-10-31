import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { HTTP_STATUS, JWT_CONFIG } from "../utils/constants.js";
import { JwtService } from "../services/jwtService.js";

/**
 * Middleware xác thực JWT token
 * Kiểm tra token trong header Authorization
 */

export const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ cookie hoặc header Authorization
    let token = req.cookies.accessToken;

    // Nếu không có token trong cookie, thử lấy từ header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Token không được cung cấp",
      });
    }

    try {
      // Xác thực token
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);

      // Tìm user trong database
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Token không hợp lệ - User không tồn tại",
        });
      }

      if (!user.isActive) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: "Tài khoản đã bị vô hiệu hóa",
        });
      }

      // Lưu thông tin user vào request để sử dụng ở các middleware/controller tiếp theo
      req.user = user;
      req.userId = user._id;

      next();
    } catch (accessTokenError) {
      // Access token không hợp lệ hoặc đã hết hạn
      if (
        accessTokenError.name === "TokenExpiredError" ||
        accessTokenError.name === "JsonWebTokenError"
      ) {
        // Kiểm tra refreshToken
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "Token đã hết hạn",
          });
        }

        try {
          // Kiểm tra refreshToken
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            JWT_CONFIG.REFRESH_SECRET
          );

          // Tìm user trong database
          const user = await User.findById(decodedRefreshToken.id).select(
            "-password"
          );

          if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
              success: false,
              message: "Token không hợp lệ - User không tồn tại",
            });
          }

          if (!user.isActive) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
              success: false,
              message: "Tài khoản đã bị vô hiệu hóa",
            });
          }

          // RefreshToken hợp lệ, tạo accessToken mới
          const jwtService = new JwtService();
          const newTokens = await jwtService.createTokenJwt(user.email);

          if (!newTokens) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
              success: false,
              message: "Không thể tạo token mới",
            });
          }

          // Thiết lập cookie accessToken mới
          res.cookie("accessToken", newTokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000, // 15 phút
          });

          // Thiết lập cookie refreshToken mới
          res.cookie("refreshToken", newTokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
          });

          // Lưu thông tin user vào request để sử dụng ở các middleware/controller tiếp theo
          req.user = user;
          req.userId = user._id;

          next();
        } catch (refreshTokenError) {
          // RefreshToken cũng đã hết hạn hoặc không hợp lệ
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
 * Middleware kiểm tra quyền admin
 * Phải được sử dụng sau authMiddleware
 */
export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

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
 * Middleware kiểm tra quyền user hoặc admin
 * Cho phép user truy cập tài nguyên của chính họ hoặc admin truy cập tất cả
 */
export const userOrAdminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

    const { id } = req.params;
    const userId = req.user._id.toString();

    // Admin có thể truy cập tất cả
    if (req.user.role === "admin") {
      return next();
    }

    // User chỉ có thể truy cập tài nguyên của chính họ
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
 * Middleware xác thực tùy chọn
 * Không bắt buộc phải có token, nhưng nếu có thì sẽ xác thực
 */
export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ cookie hoặc header
    let token = req.cookies.accessToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return next(); // Không có token, tiếp tục mà không xác thực
    }

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id;
      }
    } catch (error) {
      // Token không hợp lệ, nhưng vẫn tiếp tục
      console.log(
        "Optional auth: Invalid token, continuing without authentication"
      );
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next(); // Tiếp tục ngay cả khi có lỗi
  }
};

/**
 * Middleware kiểm tra tài khoản đang hoạt động
 */
export const activeUserMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

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
 * Utility function để tạo JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_CONFIG.SECRET, {
    expiresIn: JWT_CONFIG.EXPIRES_IN,
  });
};

/**
 * Utility function để xác thực token (không phải middleware)
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_CONFIG.SECRET);
  } catch (error) {
    throw error;
  }
};
