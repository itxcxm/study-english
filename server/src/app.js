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

app.use(
  cors({
    origin: "http://localhost:3000", // chỉ định origin cụ thể
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
