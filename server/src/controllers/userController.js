import { Router } from "express";
import { UserService } from "../services/userService.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

// Controller quản lý các thao tác với User
export class UserController {
  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.initializeRoutes();
  }

  // Khởi tạo các route cho User
  initializeRoutes() {
    this.router.get("/", authMiddleware, adminMiddleware, this.getUsers); // Lấy danh sách tất cả user
    this.router.get("/me", authMiddleware, this.getCurrentUser); // Lấy thông tin user hiện tại
    this.router.get("/:id", authMiddleware, adminMiddleware, this.getUserById); // Lấy thông tin user theo id
    this.router.post("/", this.createUser); // Tạo mới user 
    this.router.put(
      "/:id/admin",
      authMiddleware,
      adminMiddleware,
      this.updateUserByAdmin
    ); // Admin cập nhật user (username, permissions, status, photo)
    this.router.put("/:id/profile", authMiddleware, this.updateUserProfile); // User cập nhật profile của mình (password, name, email, photo)
    this.router.delete(
      "/:id",
      authMiddleware,
      adminMiddleware,
      this.deleteUser
    ); // Xóa user (chỉ admin)
  }

  // Tạo user mới
  createUser = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      if (user === null) {
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: "Email đã tồn tại",
        });
      }
      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: user,
        message: "Tạo user thành công",
      });
    } catch (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Lấy danh sách user
  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Lấy thông tin user hiện tại
  getCurrentUser = async (req, res) => {
    try {
      const user = req.user;
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
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
          message: "Không tìm thấy user",
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Admin cập nhật user: username (name), permissions (role), status, photo (avatar_url)
  updateUserByAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUserByAdmin(id, req.body);

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "Không tìm thấy user",
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
        message: "Cập nhật user thành công",
      });
    } catch (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  };

  // User cập nhật profile của mình: password, name, email, photo (avatar_url)
  updateUserProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id.toString();

      // User chỉ có thể cập nhật profile của chính họ (trừ admin)
      if (req.user.role !== "admin" && userId !== id) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: "Bạn chỉ có thể cập nhật profile của chính mình",
        });
      }

      const user = await this.userService.updateUserProfile(id, req.body);

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "Không tìm thấy user",
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
        message: "Cập nhật profile thành công",
      });
    } catch (error) {
      // Kiểm tra nếu lỗi là email đã tồn tại
      if (error.message === "Email đã tồn tại") {
        return res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message,
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
          message: "Không tìm thấy user",
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Xóa user thành công",
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };
}
