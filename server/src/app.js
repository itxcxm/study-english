import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database.js";
import { UserController } from "./controllers/userController.js";
import { AuthController } from "./controllers/authController.js";
import { ReviewController } from "./controllers/reviewController.js";

// Tải các biến môi trường từ file .env
dotenv.config();

const app = express();

// Cấu hình middleware

// Cấu hình CORS - sử dụng environment variable hoặc localhost cho development
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép requests không có origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // cho phép gửi cookie
  })
);

app.use(cookieParser()); // Parse cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Khởi tạo controller và sử dụng router
const userController = new UserController();
app.use("/api/users", userController.router);

const authController = new AuthController();
app.use("/api/auth", authController.router);

const reviewController = new ReviewController();
app.use("/api/review", reviewController.router);

// Kết nối tới database
connectDB();

export default app;
