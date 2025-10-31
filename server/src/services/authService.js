import { AuthRepository } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../utils/constants.js";

// Lớp UserService xử lý logic nghiệp vụ liên quan đến người dùng
export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  // lấy thông tin người dùng
  async checkEmail(email) {
    return await this.authRepository.findByEmail(email);
  }

  // kiểm tra password
  async checkPassword(email, password) {
    const passwords = await this.authRepository.findByPassword(email);
    return await bcrypt.compare(password, passwords);
  }

  // kiểm tra refresh token
  async checkRefreshToken(refreshToken) {
    return await jwt.verify(refreshToken, JWT_CONFIG.REFRESH_SECRET);
  }

  // kiểm tra access token
  async checkAccessToken(accessToken) {
    return await jwt.verify(accessToken, JWT_CONFIG.SECRET);
  }

  // kiểm tra status
  async checkStatus(email) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return user.status;
  }
}
