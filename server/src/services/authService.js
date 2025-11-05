/**
 * 🇻🇳 Service xử lý logic nghiệp vụ xác thực
 * 🇻🇳 Xử lý kiểm tra email, password, token và trạng thái tài khoản
 */
import { AuthRepository } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../utils/constants.js";

// 🇻🇳 Lớp AuthService xử lý logic nghiệp vụ liên quan đến xác thực
export class AuthService {
  constructor() {
    // 🇻🇳 Khởi tạo repository để truy vấn database
    this.authRepository = new AuthRepository();
  }

  // 🇻🇳 Lấy thông tin người dùng theo email
  async checkEmail(email) {
    return await this.authRepository.findByEmail(email);
  }

  // 🇻🇳 Kiểm tra password có đúng không
  // 🇻🇳 So sánh password người dùng nhập với password đã hash trong database
  async checkPassword(email, password) {
    const passwords = await this.authRepository.findByPassword(email);
    return await bcrypt.compare(password, passwords);
  }

  // 🇻🇳 Kiểm tra và giải mã refresh token
  async checkRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, JWT_CONFIG.REFRESH_SECRET);
  }

  // 🇻🇳 Kiểm tra và giải mã access token
  async checkAccessToken(accessToken) {
    return await jwt.verify(accessToken, JWT_CONFIG.SECRET);
  }

  // 🇻🇳 Kiểm tra trạng thái tài khoản (active, inactive, suspended)
  async checkStatus(email) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return user.status;
  }
}
