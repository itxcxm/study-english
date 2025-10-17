import { IProduct } from '../models/Product';
import { ProductRepository } from '../repositories/baseRepository';

// Service quản lý các thao tác liên quan tới Product
export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    // Khởi tạo repository cho Product
    this.productRepository = new ProductRepository();
  }

  // Lấy danh sách tất cả sản phẩm
  async getAllProducts(): Promise<IProduct[]> {
    return await this.productRepository.findAll();
  }

  // Lấy thông tin sản phẩm theo id
  async getProductById(id: string): Promise<IProduct | null> {
    return await this.productRepository.findById(id);
  }

  // Tạo sản phẩm mới
  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    return await this.productRepository.create(productData);
  }

  // Cập nhật sản phẩm theo id
  async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
    return await this.productRepository.update(id, productData);
  }

  // Xóa sản phẩm theo id
  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}
