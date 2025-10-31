import { BaseRepository } from "./baseRepository.js";
import { User } from "../models/User.js";

// Định nghĩa lớp UserRepository kế thừa BaseRepository
export class UserRepository extends BaseRepository {
  constructor() {
    super(User); // Truyền model User vào BaseRepository
  }

  // Tìm người dùng theo email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  // Tìm người dùng theo email nhưng loại trừ một user ID (dùng để kiểm tra email khi cập nhật)
  async findByEmailExcludingId(email, excludeId) {
    return await this.model.findOne({
      email,
      _id: { $ne: excludeId },
    });
  }

  // Lấy danh sách người dùng đang hoạt động (isActive: true)
  async findActiveUsers() {
    return await this.model.find({ isActive: true });
  }

  // Cập nhật bản ghi theo id với validation
  async update(id, data) {
    // Sử dụng runValidators để đảm bảo validation được chạy
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
}
