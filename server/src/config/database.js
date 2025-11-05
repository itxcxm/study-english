/**
 * 🇻🇳 Cấu hình kết nối MongoDB database
 * 🇻🇳 Sử dụng Mongoose để kết nối với MongoDB
 */
import mongoose from "mongoose";

/**
 * 🇻🇳 Hàm kết nối tới MongoDB database
 * 🇻🇳 Sử dụng MONGODB_URI từ biến môi trường hoặc localhost mặc định
 */
export const connectDB = async () => {
  try {
    // 🇻🇳 Lấy URI từ biến môi trường hoặc sử dụng localhost mặc định
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/study-english";
    // 🇻🇳 Kết nối tới MongoDB
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    // 🇻🇳 Nếu kết nối thất bại, log lỗi và thoát ứng dụng
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
