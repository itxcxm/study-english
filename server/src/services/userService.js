import { UserRepository } from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';

// Lớp UserService xử lý logic nghiệp vụ liên quan đến người dùng
export class UserService {
  // Khởi tạo repository để thao tác với database người dùng
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Tạo người dùng mới, kiểm tra nếu user đã tồn tại theo email thì không tạo, mã hoá mật khẩu trước khi lưu
  async createUser(userData) {
    // Kiểm tra xem user đã tồn tại hay chưa dựa vào email
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      // Nếu user đã tồn tại, trả về thông báo lỗi
      return null;
    }else{
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      // Trả về đối tượng người dùng đã tạo
      return await this.userRepository.create(userData);
    }
  }

  // Lấy thông tin người dùng theo ID
  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  // Lấy danh sách tất cả người dùng đang hoạt động
  async getAllUsers() {
    return await this.userRepository.findActiveUsers();
  }
}
