import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
      // Không dùng minlength vì password được hash trong service layer
      // Hashed password luôn dài hơn 6 ký tự
    },
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
      trim: true,
      minlength: [1, "Tên không được để trống"],
      maxlength: [100, "Tên không được vượt quá 100 ký tự"],
    },
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "admin", "censor"],
        message: "Role phải là một trong các giá trị: user, admin, censor",
      },
    },
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "inactive", "suspended"],
        message:
          "Status phải là một trong các giá trị: active, inactive, suspended",
      },
    },
    avatar_url: {
      type: String,
      default: "",
      trim: true,
      validate: {
        validator: function (v) {
          // Cho phép rỗng hoặc URL hợp lệ
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export { User };
