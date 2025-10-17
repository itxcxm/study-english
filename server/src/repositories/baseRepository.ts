import { Model } from 'mongoose';

// Repository cơ sở cho thao tác CRUD, sử dụng với Mongoose Model
export abstract class BaseRepository<T> {
  // Nhận vào model khi khởi tạo
  constructor(protected model: Model<T>) {}

  // Tạo mới một bản ghi
  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  // Tìm theo id
  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  // Lấy tất cả bản ghi
  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  // Cập nhật theo id
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Xóa theo id, trả về true nếu xóa được
  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}

// Repository cho User với các hàm đặc thù
import { User } from '../models/User';

// Có thể tùy chỉnh lại kiểu dữ liệu ở đây nếu đã định nghĩa interface IUser ở models/User.js
export class UserRepository extends BaseRepository<any> {
  constructor() {
    super(User);
  }

  // Tìm user theo email
  async findByEmail(email: string) {
    return await this.model.findOne({ email }).exec();
  }

  // Lấy danh sách user đang hoạt động (isActive=true)
  async findActiveUsers() {
    return await this.model.find({ isActive: true }).exec();
  }
}

// Repository cho Product
import { Product, IProduct } from '../models/Product';

export class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(Product);
  }

  // Tìm sản phẩm theo category
  async findByCategory(category: string) {
    return await this.model.find({ category }).exec();
  }

  // Lấy danh sách sản phẩm đang hoạt động
  async findActiveProducts() {
    return await this.model.find({ status: 'active' }).exec();
  }
}