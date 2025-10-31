import { UserRepository } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

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
    } else {
      // Validate password
      if (userData.password) {
        if (userData.password.length < 6) {
          throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
        }
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

  // Lấy thông tin người dùng theo email
  async getUserByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  // Lấy danh sách tất cả người dùng
  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  // Cập nhật thông tin người dùng (generic method - giữ lại để tương thích)
  async updateUser(id, userData) {
    // Nếu có mật khẩu mới, validate và mã hoá nó
    if (userData.password) {
      if (userData.password.length < 6) {
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
      }
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await this.userRepository.update(id, userData);
  }

  // Admin cập nhật user: username (name), permissions (role), status, photo (avatar_url)
  async updateUserByAdmin(id, updateData) {
    // Chỉ cho phép cập nhật các trường: name, role, status, avatar_url
    const allowedFields = ["name", "role", "status", "avatar_url"];
    const filteredData = {};

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    }

    // Validate role nếu có
    if (filteredData.role) {
      const validRoles = ["user", "admin", "censor"];
      if (!validRoles.includes(filteredData.role)) {
        throw new Error(
          `Role không hợp lệ. Chỉ chấp nhận: ${validRoles.join(", ")}`
        );
      }
    }

    // Validate status nếu có
    if (filteredData.status) {
      const validStatuses = ["active", "inactive", "suspended"];
      if (!validStatuses.includes(filteredData.status)) {
        throw new Error(
          `Status không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(", ")}`
        );
      }
    }

    return await this.userRepository.update(id, filteredData);
  }

  // User cập nhật profile của mình: password, name, email, photo (avatar_url)
  async updateUserProfile(id, updateData) {
    // Chỉ cho phép cập nhật các trường: password, name, email, avatar_url
    const allowedFields = ["password", "name", "email", "avatar_url"];
    const filteredData = {};

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    }

    // Validate và mã hoá mật khẩu nếu có
    if (filteredData.password) {
      if (filteredData.password.length < 6) {
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
      }
      filteredData.password = await bcrypt.hash(filteredData.password, 10);
    }

    // Kiểm tra email đã tồn tại chưa (trừ user hiện tại)
    if (filteredData.email) {
      const existingUser = await this.userRepository.findByEmailExcludingId(
        filteredData.email,
        id
      );
      if (existingUser) {
        throw new Error("Email đã tồn tại");
      }
    }

    return await this.userRepository.update(id, filteredData);
  }

  // Kiểm tra email đã tồn tại chưa (trừ một user ID)
  async checkEmailUniqueness(email, excludeId = null) {
    if (excludeId) {
      const existingUser = await this.userRepository.findByEmailExcludingId(
        email,
        excludeId
      );
      return !existingUser; // Trả về true nếu email unique
    } else {
      const existingUser = await this.userRepository.findByEmail(email);
      return !existingUser; // Trả về true nếu email unique
    }
  }

  // Xoá người dùng
  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}
