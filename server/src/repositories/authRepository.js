import { BaseRepository } from './baseRepository.js';
import { User } from '../models/User.js';

// Định nghĩa lớp UserRepository kế thừa BaseRepository
export class AuthRepository extends BaseRepository {
  constructor() {
    super(User); // Truyền model User vào BaseRepository
  }

  // Tìm người dùng theo email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  // Lấy password của người dùng
  async findByPassword(email) {
    const user = await this.model.findOne({ email: email }).select('password');
    return user.password
  }
}
