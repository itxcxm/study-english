import express, { Application } from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import controllers from './controllers';
// TODO: Implement error handler middleware
// import { errorHandler } from './middlewares/errorHandler';

/**
 * Khởi tạo Express application
 * Đây là file chính để cấu hình server
 */
const app: Application = express();

/**
 * Cấu hình các middleware cơ bản
 */
// Cho phép CORS (Cross-Origin Resource Sharing) - client có thể gọi API từ domain khác
app.use(cors());

// Parse JSON body từ request
app.use(express.json());

// Parse URL-encoded body từ request (form data)
app.use(express.urlencoded({ extended: true }));

/**
 * Cấu hình routes
 * Tất cả API routes sẽ bắt đầu với prefix '/api'
 */
app.use('/api', controllers);

/**
 * TODO: Đăng ký error handler middleware
 */
// app.use(errorHandler);

/**
 * Kết nối đến database
 * Nếu kết nối thất bại thì thoát chương trình
 */
connectDatabase().catch((err) => {
  console.error('❌ Failed to connect to database:', err);
  process.exit(1);
});

// Export app để sử dụng trong server.js
export default app;

// Export PORT để sử dụng trong server.js
export const PORT = process.env.PORT || 3001;
