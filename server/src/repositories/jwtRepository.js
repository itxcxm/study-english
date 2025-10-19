import { BaseRepository } from './baseRepository.js';
import { User } from '../models/User.js';

// Định nghĩa lớp UserRepository kế thừa BaseRepository
export class JwtRepository extends BaseRepository {
  constructor() {
    super(User); // Truyền model User vào BaseRepository
  }

  // Tìm người dùng theo email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
}
