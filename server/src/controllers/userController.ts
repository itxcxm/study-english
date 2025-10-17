import { Router } from 'express';
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

// TODO: Nên tự định nghĩa hằng số HTTP_STATUS, bổ sung file nếu thiếu
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// TODO: Thay đổi thành middleware thực tế nếu đã implement
const authMiddleware = (req: Request, res: Response, next: () => void) => next();

export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.initializeRoutes();
  }

  // Khởi tạo các route cho user
  private initializeRoutes(): void {
    this.router.get('/', this.getUsers); // Lấy tất cả user
    this.router.get('/:id', this.getUserById); // Lấy 1 user theo id
    this.router.post('/', this.createUser); // Tạo mới user
    this.router.put('/:id', authMiddleware, this.updateUser); // Cập nhật user (yêu cầu auth)
    this.router.delete('/:id', authMiddleware, this.deleteUser); // Xóa user (yêu cầu auth)
  }

  // Tạo mới user
  private createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: user,
        message: 'Tạo người dùng thành công' // Thông báo tiếng Việt
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || 'Tạo người dùng thất bại'
      });
    }
  };

  // Lấy danh sách tất cả user (chỉ trả về user đang hoạt động)
  private getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: users
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách người dùng'
      });
    }
  };

  // Lấy thông tin user theo id
  private getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy người dùng'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy thông tin người dùng'
      });
    }
  };

  // Chức năng cập nhật user
  private updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);

      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy người dùng'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
        message: 'Cập nhật người dùng thành công'
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || 'Cập nhật người dùng thất bại'
      });
    }
  };

  // Chức năng xóa user
  private deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy người dùng'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Xóa người dùng thành công'
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Xóa người dùng thất bại'
      });
    }
  };
}
