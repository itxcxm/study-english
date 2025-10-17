import mongoose, { Document, Schema } from 'mongoose';
import { UserRole } from '../utils/enums';

/**
 * Interface định nghĩa cấu trúc của User trong database
 * Kế thừa từ Document của Mongoose để có các method của MongoDB
 */
export interface IUser extends Document {
  email: string;           // Email của user (duy nhất)
  password: string;        // Mật khẩu đã được hash
  name: string;           // Tên đầy đủ của user
  role: UserRole;         // Vai trò của user (admin, user, moderator)
  isActive: boolean;      // Trạng thái hoạt động của user
  createdAt: Date;        // Thời gian tạo (tự động)
  updatedAt: Date;        // Thời gian cập nhật cuối (tự động)
}

/**
 * Schema định nghĩa cấu trúc User trong MongoDB
 * Bao gồm validation và các quy tắc cho từng field
 */
const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true,     // Bắt buộc phải có
    unique: true        // Không được trùng lặp
  },
  password: { 
    type: String, 
    required: true      // Bắt buộc phải có
  },
  name: { 
    type: String, 
    required: true      // Bắt buộc phải có
  },
  role: { 
    type: String, 
    enum: Object.values(UserRole),  // Chỉ chấp nhận các giá trị trong UserRole
    default: UserRole.USER          // Mặc định là USER
  },
  isActive: { 
    type: Boolean, 
    default: true        // Mặc định là active
  }
}, {
  timestamps: true        // Tự động thêm createdAt và updatedAt
});

// Export model User để sử dụng trong các service và controller
export const User = mongoose.model<IUser>('User', userSchema);
