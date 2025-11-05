/**
 * 🇻🇳 File cấu hình chính của Express server
 * 🇻🇳 Thiết lập middleware, routes và kết nối database
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import { UserController } from "./controllers/userController.js";
import { AuthController } from "./controllers/authController.js";
import { ReviewController } from "./controllers/reviewController.js";

// 🇻🇳 Tải các biến môi trường từ file .env
dotenv.config();

// 🇻🇳 Khởi tạo ứng dụng Express
const app = express();

// 🇻🇳 Cấu hình middleware

// 🇻🇳 Cấu hình CORS - sử dụng environment variable hoặc localhost cho development
// 🇻🇳 Cho phép client từ các origin được cấu hình gửi request
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // 🇻🇳 Cho phép requests không có origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // 🇻🇳 Kiểm tra origin có trong danh sách cho phép hoặc đang ở môi trường development
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 🇻🇳 Cho phép gửi cookie qua cross-origin requests
  })
);

// 🇻🇳 Parse cookies từ request headers
app.use(cookieParser());
// 🇻🇳 Parse JSON body từ request
app.use(express.json());
// 🇻🇳 Parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// 🇻🇳 Khởi tạo controller và sử dụng router
// 🇻🇳 Route cho quản lý người dùng
const userController = new UserController();
app.use("/api/users", userController.router);

// 🇻🇳 Route cho xác thực (đăng nhập, đăng xuất, kiểm tra auth)
const authController = new AuthController();
app.use("/api/auth", authController.router);

// 🇻🇳 Route cho ôn tập và câu hỏi
const reviewController = new ReviewController();
app.use("/api/review", reviewController.router);

// 🇻🇳 Kết nối tới database MongoDB
connectDB();

export default app;
