import { Router } from 'express';
import { AuthService } from '../services/authService.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { authMiddleware } from '../middlewares/auth.js';

// Controller xử lý xác thực (authentication)
export class AuthController {
    constructor() {
        this.router = Router();
        this.authService = new AuthService();
        this.initializeRoutes();
    }

    // Khởi tạo các route cho xác thực
    initializeRoutes() {
        this.router.post('/', this.login); // Đăng nhập
    }

    // Hàm xử lý đăng nhập, kiểm tra email và password từ request
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Kiểm tra thiếu email
            if (!email) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Email là bắt buộc"
                });
            }

            // Kiểm tra thiếu mật khẩu
            if (!password) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Password là bắt buộc"
                });
            }

            // Kiểm tra sự tồn tại của người dùng qua email
            const user = await this.authService.checkEmail(email);

            if (!user) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    success: false,
                    message: "Tài khoản không tồn tại"
                });
            }

            // Kiểm tra sự hợp lệ của mật khẩu
            const isValidPassword = await this.authService.checkPassword(email, password);

            if (!isValidPassword) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Sai mật khẩu"
                });
            }

            // Đăng nhập thành công, trả dữ liệu user
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Đăng nhập thành công"
            });
        } catch (error) {
            // Lỗi xử lý nội bộ server
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    };
}