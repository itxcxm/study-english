import { BaseRepository } from './baseRepository.js';
import { User } from '../models/User.js';

// Định nghĩa lớp UserRepository kế thừa BaseRepository
export class UserRepository extends BaseRepository {
  constructor() {
    super(User); // Truyền model User vào BaseRepository
  }

  // Tìm người dùng theo email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  // Lấy danh sách người dùng đang hoạt động (isActive: true)
  async findActiveUsers() {
    return await this.model.find({ isActive: true });
  }
}
