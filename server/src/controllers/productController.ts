import { Router } from 'express';
import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { HTTP_STATUS } from '../utils/constants';
import { authMiddleware } from '../middlewares/auth';

// Controller quản lý các route liên quan tới sản phẩm
export class ProductController {
  public router: Router;
  private productService: ProductService;

  constructor() {
    this.router = Router();
    this.productService = new ProductService();
    this.initializeRoutes();
  }

  // Khởi tạo các route cho Product
  private initializeRoutes(): void {
    // Lấy tất cả sản phẩm
    this.router.get('/', this.getProducts);
    // Lấy 1 sản phẩm theo id
    this.router.get('/:id', this.getProductById);
    // Tạo mới sản phẩm (yêu cầu xác thực)
    this.router.post('/', authMiddleware, this.createProduct);
    // Cập nhật sản phẩm (yêu cầu xác thực)
    this.router.put('/:id', authMiddleware, this.updateProduct);
    // Xoá sản phẩm (yêu cầu xác thực)
    this.router.delete('/:id', authMiddleware, this.deleteProduct);
  }

  // Lấy danh sách tất cả sản phẩm
  private getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: products
      });
    } catch (error: any) {
      // Nếu có lỗi thì trả về lỗi hệ thống với thông báo tiếng Việt
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy danh sách sản phẩm'
      });
    }
  };

  // Lấy chi tiết sản phẩm theo id
  private getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);

      if (!product) {
        // Không tìm thấy sản phẩm, trả về NOT_FOUND với thông báo tiếng Việt
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy sản phẩm'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: product
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Có lỗi xảy ra khi lấy sản phẩm'
      });
    }
  };

  // Tạo mới sản phẩm
  private createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: product,
        message: 'Tạo sản phẩm thành công'
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || 'Tạo sản phẩm thất bại'
      });
    }
  };

  // Cập nhật sản phẩm theo id
  private updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.productService.updateProduct(id, req.body);

      if (!product) {
        // Nếu không tìm thấy sản phẩm để cập nhật
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy sản phẩm'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: product,
        message: 'Cập nhật sản phẩm thành công'
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || 'Cập nhật sản phẩm thất bại'
      });
    }
  };

  // Xoá sản phẩm theo id
  private deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.productService.deleteProduct(id);

      if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy sản phẩm'
        });
        return;
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Xoá sản phẩm thành công'
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Xoá sản phẩm thất bại'
      });
    }
  };
}
