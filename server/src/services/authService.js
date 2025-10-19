import { AuthRepository } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

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
}
