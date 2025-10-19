import { Router } from 'express';
import { AuthService } from '../services/authService.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { authMiddleware } from '../middlewares/auth.js';
import { JwtService } from '../services/jwtService.js'

// Controller xử lý xác thực (authentication)
export class AuthController {
    constructor() {
        this.router = Router();
        this.authService = new AuthService();
        this.jwtService = new JwtService();
        this.initializeRoutes();
    }

    // Khởi tạo các route cho xác thực
    initializeRoutes() {
        this.router.post('/', this.login); // Đăng nhập
    }

    // Hàm xử lý đăng nhập, kiểm tra email và password từ request
    // Hàm xử lý đăng nhập người dùng
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Kiểm tra email có được gửi lên không
            if (!email) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Email là bắt buộc"
                });
            }

            // Kiểm tra mật khẩu có được gửi lên không
            if (!password) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Password là bắt buộc"
                });
            }

            // Kiểm tra xem người dùng có tồn tại với email này không
            const user = await this.authService.checkEmail(email);
            if (!user) {
                // Không tìm thấy tài khoản với email này
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    success: false,
                    message: "Tài khoản không tồn tại"
                });
            }

            // Kiểm tra tính hợp lệ của mật khẩu truyền vào
            const isValidPassword = await this.authService.checkPassword(email, password);
            if (!isValidPassword) {
                // Mật khẩu không đúng
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: "Sai mật khẩu"
                });
            }

            // Sinh ra token JWT (trả về accessToken và refreshToken)
            const token = await this.jwtService.createTokenJwt(email);

            // Nếu không thể tạo token (thông tin user có thể sai hoặc lỗi hệ thống)
            if (!token) {
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Không thể tạo token"
                });
            }

            // Thiết lập cookie accessToken (chỉ gửi qua https, httpOnly, chặn CSRF, thời gian sống 15 phút)
            res.cookie('accessToken', token.accessToken, {
                httpOnly: true,
                secure: true, // Yêu cầu HTTPS
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000 // 15 phút
            });

            // Thiết lập cookie refreshToken (chỉ gửi qua https, httpOnly, chặn CSRF, sống 7 ngày)
            res.cookie('refreshToken', token.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
            });

            // Đăng nhập thành công, trả về thông báo
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Đăng nhập thành công",
            });
        } catch (error) {
            // Lỗi hệ thống phía server
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message
            });
        }
    };
}