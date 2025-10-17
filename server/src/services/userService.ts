import { UserRepository } from '../repositories/baseRepository';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

// Service quản lý các thao tác liên quan tới User
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    // Khởi tạo repository cho user
    this.userRepository = new UserRepository();
  }

  // Tạo user mới, tự động mã hóa password nếu có
  async createUser(userData: Partial<typeof User.prototype>): Promise<any> {
    if (userData.password) {
      // Mã hóa password trước khi lưu
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    // Lưu user mới vào database
    return await this.userRepository.create(userData);
  }

  // Lấy thông tin user theo id
  async getUserById(id: string): Promise<any | null> {
    return await this.userRepository.findById(id);
  }

  // Lấy danh sách tất cả các user đang hoạt động
  async getAllUsers(): Promise<any[]> {
    return await this.userRepository.findActiveUsers();
  }

  // Cập nhật thông tin user
  async updateUser(id: string, userData: Partial<typeof User.prototype>): Promise<any | null> {
    if (userData.password) {
      // Mã hóa password mới nếu có
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await this.userRepository.update(id, userData);
  }

  // Xóa user (soft delete)
  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
