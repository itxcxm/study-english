/**
 * 🇻🇳 Model User - Schema định nghĩa cấu trúc dữ liệu người dùng
 * 🇻🇳 Lưu trữ thông tin email, password, tên, role, status và avatar
 */
import mongoose from "mongoose";

const { Schema } = mongoose;

// 🇻🇳 Định nghĩa schema cho User
const userSchema = new Schema(
  {
    // 🇻🇳 Email của người dùng (bắt buộc, duy nhất, phải đúng format)
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không hợp lệ",
      ],
    },
    // 🇻🇳 Mật khẩu đã được hash (bắt buộc)
    // 🇻🇳 Không dùng minlength vì password được hash trong service layer
    // 🇻🇳 Hashed password luôn dài hơn 6 ký tự
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
    },
    // 🇻🇳 Tên người dùng (bắt buộc, từ 1-100 ký tự)
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
      trim: true,
      minlength: [1, "Tên không được để trống"],
      maxlength: [100, "Tên không được vượt quá 100 ký tự"],
    },
    // 🇻🇳 Vai trò của người dùng: user, admin, hoặc censor
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin", "censor"],
        message: "Role phải là một trong các giá trị: user, admin, censor",
      },
    },
    // 🇻🇳 Trạng thái tài khoản: active, inactive, hoặc suspended
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "inactive", "suspended"],
        message:
          "Status phải là một trong các giá trị: active, inactive, suspended",
      },
    },
    // 🇻🇳 URL ảnh đại diện (tùy chọn, phải là URL hợp lệ nếu có)
    avatar_url: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: function (v) {
          // 🇻🇳 Cho phép rỗng hoặc URL hợp lệ
          if (!v) return true;
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: "Avatar URL phải là một URL hợp lệ",
      },
    },
    // 🇻🇳 Flag đánh dấu tài khoản có đang hoạt động không (boolean)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // 🇻🇳 Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// 🇻🇳 Tạo model User từ schema
const User = mongoose.model("User", userSchema);

export { User };
