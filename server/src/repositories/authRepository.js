/**
 * 🇻🇳 Repository xử lý truy vấn database cho authentication
 * 🇻🇳 Kế thừa BaseRepository và cung cấp các phương thức truy vấn user
 */
import { BaseRepository } from './baseRepository.js';
import { User } from '../models/User.js';

// 🇻🇳 Định nghĩa lớp AuthRepository kế thừa BaseRepository
export class AuthRepository extends BaseRepository {
  constructor() {
    // 🇻🇳 Truyền model User vào BaseRepository
    super(User);
  }

  /**
   * 🇻🇳 Tìm người dùng theo email
   * @param {string} email - Email của người dùng cần tìm
   * @returns {object|null} Thông tin user hoặc null nếu không tìm thấy
   */
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  /**
   * 🇻🇳 Lấy password đã hash của người dùng
   * 🇻🇳 Chỉ lấy field password để so sánh với password người dùng nhập
   * @param {string} email - Email của người dùng
   * @returns {string|null} Password đã hash hoặc null nếu không tìm thấy user
   */
  async findByPassword(email) {
    const user = await this.model.findOne({ email: email }).select('password');
    return user?.password || null;
  }
}
