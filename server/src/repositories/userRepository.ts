import { User } from '../models/User.js';

/**
 * Hàm lấy thông tin user theo email
 * @param email - Email của user cần tìm
 * @returns Promise<User | null> - Trả về user nếu tìm thấy, null nếu không tìm thấy
 */
export const getUserByEmail = async (email: string) => {
  try {
    // Tìm user có đúng email, trả về 1 user (nếu có)
    const result = await User.findOne({ email });
    return result;
  } catch (error) {
    // Nếu có lỗi, throw error để xử lý ở layer trên
    throw error;
  }
};

/**
 * Hàm tạo user mới với email và password
 * @param email - Email của user
 * @param password - Mật khẩu đã được hash
 * @returns Promise<User> - Trả về user vừa được tạo
 */
export const createUser = async (email: string, password: string) => {
  try {
    // Tạo instance user mới
    const newUser = new User({ email, password });
    // Lưu vào database
    await newUser.save();
    // Trả về user vừa tạo
    return newUser;
  } catch (error) {
    // Nếu có lỗi, throw error để xử lý ở layer trên
    throw error;
  }
};