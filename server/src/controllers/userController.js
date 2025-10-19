import { Router } from 'express';
import { UserService } from '../services/userService.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { authMiddleware } from '../middlewares/auth.js';

// Controller quản lý các thao tác với User
export class UserController {
  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.initializeRoutes();
  }

  // Khởi tạo các route cho User
  initializeRoutes() {
    this.router.get('/', this.getUsers); // Lấy danh sách tất cả user
    this.router.get('/:id', this.getUserById); // Lấy thông tin user theo id
    this.router.post('/', this.createUser); // Tạo mới user
    this.router.put('/:id', authMiddleware, this.updateUser); // Cập nhật user (cần xác thực)
    this.router.delete('/:id', authMiddleware, this.deleteUser); // Xóa user (cần xác thực)
  }

  // Tạo user mới
  createUser = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: user,
        message: 'Tạo user thành công'
      });
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  };

  // Lấy danh sách user
  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  };

  // Lấy thông tin user theo id
  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy user'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  };

  // Cập nhật thông tin user
  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);

      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy user'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
        message: 'Cập nhật user thành công'
      });
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  };

  // Xóa user
  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy user'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Xóa user thành công'
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  };
}
