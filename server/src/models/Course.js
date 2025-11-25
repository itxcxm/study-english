import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    // Tiêu đề khóa học (bắt buộc)
    title: {
      type: String,
      required: [true, "Tiêu đề khóa học là bắt buộc"],
      trim: true,
      maxlength: [200, "Tiêu đề không được vượt quá 200 ký tự"],
    },
    // Mô tả khóa học (bắt buộc)
    description: {
      type: String,
      required: [true, "Mô tả khóa học là bắt buộc"],
      trim: true,
    },
    // Trình độ: Beginner, Intermediate, Advanced, All Levels
    level: {
      type: String,
      required: [true, "Trình độ là bắt buộc"],
      enum: {
        values: ["Beginner", "Intermediate", "Advanced", "All Levels"],
        message:
          "Trình độ phải là một trong các giá trị: Beginner, Intermediate, Advanced, All Levels",
      },
    },
    // Thời lượng khóa học
    duration: {
      type: String,
      required: [true, "Thời lượng là bắt buộc"],
      trim: true,
    },
    // Số lượng học viên
    students: {
      type: Number,
      default: 0,
      min: [0, "Số lượng học viên không được âm"],
    },
    // Đánh giá (0-5)
    rating: {
      type: Number,
      default: 0,
      min: [0, "Đánh giá không được nhỏ hơn 0"],
      max: [5, "Đánh giá không được lớn hơn 5"],
    },
    // Giá khóa học
    price: {
      type: String,
      required: [true, "Giá khóa học là bắt buộc"],
      trim: true,
    },
    // URL hình ảnh khóa học
    image: {
      type: String,
      required: [true, "Hình ảnh khóa học là bắt buộc"],
      trim: true,
      validate: {
        validator: function (v) {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: "URL hình ảnh phải là một URL hợp lệ",
      },
    },
    // Các tính năng của khóa học
    features: {
      type: [String],
      default: [],
    },
  },
  {
    // Tự động thêm createdAt và updatedAt
    timestamps: true,
  }
);

// Tạo model Course từ schema
const Course = mongoose.model("Course", courseSchema);

export { Course };
