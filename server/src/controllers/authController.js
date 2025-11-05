/**
 * 🇻🇳 Controller xử lý xác thực (authentication)
 * 🇻🇳 Quản lý đăng nhập, đăng xuất và kiểm tra trạng thái đăng nhập
 */
import { Router } from "express";
import { AuthService } from "../services/authService.js";
import {
  HTTP_STATUS,
  JWT_CONFIG,
  getCookieOptions,
} from "../utils/constants.js";
import { authMiddleware } from "../middlewares/auth.js";
import { JwtService } from "../services/jwtService.js";
import jwt from "jsonwebtoken";

// 🇻🇳 Controller xử lý xác thực (authentication)
export class AuthController {
  constructor() {
    // 🇻🇳 Khởi tạo router Express
    this.router = Router();
    // 🇻🇳 Khởi tạo service xử lý logic nghiệp vụ xác thực
    this.authService = new AuthService();
    // 🇻🇳 Khởi tạo service xử lý JWT tokens
    this.jwtService = new JwtService();
    // 🇻🇳 Khởi tạo các routes
    this.initializeRoutes();
  }

  // 🇻🇳 Khởi tạo các route cho xác thực
  initializeRoutes() {
    this.router.post("/", this.login); // 🇻🇳 Đăng nhập
    this.router.post("/logout", this.logout); // 🇻🇳 Đăng xuất
    this.router.get("/check", this.checkAuth); // 🇻🇳 Kiểm tra trạng thái đăng nhập
  }

  // 🇻🇳 Hàm xử lý đăng nhập người dùng
  login = async (req, res) => {
    try {
      // 🇻🇳 Lấy email và password từ request body
      const { email, password } = req.body;

      // 🇻🇳 Kiểm tra email có được gửi lên không
      if (!email) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Email là bắt buộc",
        });
      }

      // 🇻🇳 Kiểm tra mật khẩu có được gửi lên không
      if (!password) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Password là bắt buộc",
        });
      }

      // 🇻🇳 Kiểm tra xem người dùng có tồn tại với email này không
      const user = await this.authService.checkEmail(email);
      if (!user) {
        // 🇻🇳 Không tìm thấy tài khoản với email này
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "Tài khoản không tồn tại",
        });
      }

      // 🇻🇳 Kiểm tra tính hợp lệ của mật khẩu truyền vào
      const isValidPassword = await this.authService.checkPassword(
        email,
        password
      );
      if (!isValidPassword) {
        // 🇻🇳 Mật khẩu không đúng
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Sai mật khẩu",
        });
      }

      // 🇻🇳 Kiểm tra tài khoản có hoạt động không
      const status = await this.authService.checkStatus(email);
      if (status !== "active") {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: "Tài khoản đã bị vô hiệu hóa",
        });
      }
      // 🇻🇳 Sinh ra token JWT (trả về accessToken và refreshToken)
      const token = await this.jwtService.createTokenJwt(email);

      // 🇻🇳 Nếu không thể tạo token (thông tin user có thể sai hoặc lỗi hệ thống)
      if (!token) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Không thể tạo token",
        });
      }

      // 🇻🇳 Thiết lập cookie accessToken (chỉ gửi qua https, httpOnly, chặn CSRF, thời gian sống 15 phút)
      const cookieOptions = getCookieOptions();
      res.cookie("accessToken", token.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 🇻🇳 15 phút
      });

      // 🇻🇳 Thiết lập cookie refreshToken (chỉ gửi qua https, httpOnly, chặn CSRF, sống 7 ngày)
      res.cookie("refreshToken", token.refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 🇻🇳 7 ngày
      });

      // 🇻🇳 Đăng nhập thành công, trả về thông báo
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      // 🇻🇳 Lỗi hệ thống phía server
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // 🇻🇳 Hàm xử lý đăng xuất
  logout = async (req, res) => {
    try {
      // 🇻🇳 Xóa cookies bằng cách set giá trị rỗng và expires trong quá khứ
      const cookieOptions = getCookieOptions();
      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // 🇻🇳 Hàm kiểm tra trạng thái đăng nhập
  checkAuth = async (req, res) => {
    try {
      // 🇻🇳 Lấy token từ cookie
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      // 🇻🇳 Nếu không có accessToken, trả về chưa đăng nhập
      if (!accessToken) {
        return res.status(HTTP_STATUS.OK).json({
          success: false,
          authenticated: false,
          message: "Chưa đăng nhập",
        });
      }

      // 🇻🇳 Thử kiểm tra access token
      try {
        // 🇻🇳 Kiểm tra và giải mã access token
        const decodedAccessToken = await this.authService.checkAccessToken(
          accessToken
        );

        // 🇻🇳 Kiểm tra tài khoản có hoạt động không
        const status = await this.authService.checkStatus(
          decodedAccessToken.email
        );
        if (status !== "active") {
          return res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            authenticated: false,
            message: "Tài khoản đã bị vô hiệu hóa",
          });
        }

        // 🇻🇳 Access token hợp lệ, trả về thông tin người dùng
        return res.status(HTTP_STATUS.OK).json({
          success: true,
          authenticated: true,
          user: {
            id: decodedAccessToken.id,
            email: decodedAccessToken.email,
            role: decodedAccessToken.role,
          },
        });
      } catch (accessTokenError) {
        // 🇻🇳 Access token không hợp lệ hoặc đã hết hạn, kiểm tra refresh token
        if (!refreshToken) {
          return res.status(HTTP_STATUS.OK).json({
            success: false,
            authenticated: false,
            message: "Token không hợp lệ hoặc đã hết hạn",
          });
        }

        try {
          // 🇻🇳 Kiểm tra và giải mã refresh token
          const decodedRefreshToken = await this.authService.checkRefreshToken(
            refreshToken
          );

          // 🇻🇳 Kiểm tra tài khoản có hoạt động không
          const status = await this.authService.checkStatus(
            decodedRefreshToken.email
          );
          if (status !== "active") {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
              success: false,
              authenticated: false,
              message: "Tài khoản đã bị vô hiệu hóa",
            });
          }

          // 🇻🇳 Refresh token hợp lệ, tạo token mới
          const newTokens = await this.jwtService.createTokenJwt(
            decodedRefreshToken.email
          );

          if (!newTokens) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
              success: false,
              authenticated: false,
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

          // 🇻🇳 Trả về thông tin người dùng với token mới
          return res.status(HTTP_STATUS.OK).json({
            success: true,
            authenticated: true,
            tokenRefreshed: true,
            user: {
              id: decodedRefreshToken.id,
              email: decodedRefreshToken.email,
              role: decodedRefreshToken.role,
            },
          });
        } catch (refreshTokenError) {
          // 🇻🇳 Cả 2 token đều không hợp lệ
          return res.status(HTTP_STATUS.OK).json({
            success: false,
            authenticated: false,
            message: "Token không hợp lệ hoặc đã hết hạn",
          });
        }
      }
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        authenticated: false,
        message: error.message,
      });
    }
  };
}
