/**
 * 🇻🇳 Service xử lý JWT tokens
 * 🇻🇳 Tạo và quản lý access token và refresh token cho người dùng
 */
import { JwtRepository } from '../repositories/jwtRepository.js';
import {HTTP_STATUS,JWT_CONFIG} from '../utils/constants.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

// 🇻🇳 Lớp JwtService xử lý logic nghiệp vụ liên quan đến JWT tokens
export class JwtService {
  constructor() {
    // 🇻🇳 Khởi tạo repository để truy vấn database
    this.jwtRepository = new JwtRepository();
  }

  /**
   * 🇻🇳 Tạo access token và refresh token cho người dùng dựa trên email
   * 🇻🇳 Tạo cả access token (thời gian sống ngắn) và refresh token (thời gian sống dài)
   * @param {string} email - Email của người dùng
   * @returns {object|null} Object chứa accessToken và refreshToken, hoặc null nếu không tìm thấy user
   */
  async createTokenJwt(email){
    // 🇻🇳 Tìm kiếm thông tin người dùng theo email
    const user = await this.jwtRepository.findByEmail(email);

    // 🇻🇳 Nếu không tìm thấy người dùng, trả về null
    if (!user) {
      return null;
    }

    // 🇻🇳 Chỉ lấy các trường cần thiết để đưa vào token để tránh lộ thông tin nhạy cảm
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    // 🇻🇳 Tạo access token sử dụng SECRET (thời gian sống ngắn, thường 15 phút)
    const accessToken = jwt.sign(
      payload, 
      JWT_CONFIG.SECRET, 
      { expiresIn: JWT_CONFIG.EXPIRES_IN || "7d" }
    );
    // 🇻🇳 Tạo refresh token sử dụng REFRESH_SECRET (thời gian sống dài, thường 7 ngày)
    const refreshToken = jwt.sign(
      payload, 
      JWT_CONFIG.REFRESH_SECRET, 
      { expiresIn: JWT_CONFIG.EXPIRES_IN_REFRESH || "7d" }
    );

    // 🇻🇳 Trả về một object chứa cả 2 token
    return { accessToken, refreshToken };
  }

}
