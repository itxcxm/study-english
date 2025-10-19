import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { UserController } from './controllers/userController.js';
import { AuthController } from "./controllers/authController.js";

// Tải các biến môi trường từ file .env
dotenv.config();

const app = express();

// Cấu hình middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Khởi tạo controller và sử dụng router
const userController = new UserController();
app.use('/api/users', userController.router);

const authController = new AuthController();
app.use('/api/auth', authController.router);
// Kết nối tới database
connectDB();

export default app;
