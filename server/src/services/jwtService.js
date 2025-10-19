import { JwtRepository } from '../repositories/jwtRepository.js';
import {HTTP_STATUS,JWT_CONFIG} from '../utils/constants.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
// Lớp UserService xử lý logic nghiệp vụ liên quan đến người dùng
export class JwtService {
  constructor() {
    this.jwtRepository = new JwtRepository();
  }

  // Tạo access token và refresh token cho người dùng dựa trên email
  async createTokenJwt(email){
    // Tìm kiếm thông tin người dùng theo email
    const user = await this.jwtRepository.findByEmail(email);

    // Nếu không tìm thấy người dùng, trả về null
    if (!user) {
      return null;
    }

    // Chỉ lấy các trường cần thiết để đưa vào token để tránh lộ thông tin nhạy cảm
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    // Tạo access token sử dụng SECRET
    const accessToken = jwt.sign(
      payload, 
      JWT_CONFIG.SECRET, 
      { expiresIn: JWT_CONFIG.EXPIRES_IN || "7d" }
    );
    // Tạo refresh token sử dụng REFRESH_SECRET
    const refreshToken = jwt.sign(
      payload, 
      JWT_CONFIG.REFRESH_SECRET, 
      { expiresIn: JWT_CONFIG.EXPIRES_IN_REFRESH || "7d" }
    );


    // Trả về một object chứa cả 2 token
    return { accessToken, refreshToken };
  }

}
