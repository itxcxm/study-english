import mongoose from 'mongoose';

/**
 * Hàm kết nối đến MongoDB database
 * Sử dụng connection string từ environment variable hoặc default local
 * @returns Promise<void> - Không trả về giá trị
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    // Lấy MongoDB URI từ environment variable hoặc sử dụng default
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/study-english';
    
    // Kết nối đến MongoDB
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    // Nếu có lỗi kết nối, log lỗi và thoát chương trình
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
