import mongoose, { Document, Schema } from 'mongoose';
import { ProductStatus } from '../utils/enums';

/**
 * Interface định nghĩa cấu trúc của Product trong database
 * Kế thừa từ Document của Mongoose để có các method của MongoDB
 */
export interface IProduct extends Document {
  name: string;                    // Tên sản phẩm
  description: string;             // Mô tả chi tiết sản phẩm
  price: number;                   // Giá sản phẩm
  status: ProductStatus;           // Trạng thái sản phẩm (active, inactive, deleted)
  category: string;                // Danh mục sản phẩm
  imageUrl?: string;               // URL hình ảnh sản phẩm (không bắt buộc)
  stock: number;                   // Số lượng tồn kho
  createdAt: Date;                 // Thời gian tạo (tự động)
  updatedAt: Date;                 // Thời gian cập nhật cuối (tự động)
}

/**
 * Schema định nghĩa cấu trúc Product trong MongoDB
 * Bao gồm validation và các quy tắc cho từng field
 */
const productSchema = new Schema<IProduct>({
  name: { 
    type: String, 
    required: true      // Bắt buộc phải có
  },
  description: { 
    type: String, 
    required: true      // Bắt buộc phải có
  },
  price: { 
    type: Number, 
    required: true      // Bắt buộc phải có
  },
  status: { 
    type: String, 
    enum: Object.values(ProductStatus),  // Chỉ chấp nhận các giá trị trong ProductStatus
    default: ProductStatus.ACTIVE        // Mặc định là ACTIVE
  },
  category: { 
    type: String, 
    required: true      // Bắt buộc phải có
  },
  imageUrl: { 
    type: String      // Không bắt buộc
  },
  stock: { 
    type: Number, 
    default: 0         // Mặc định là 0
  }
}, {
  timestamps: true    // Tự động thêm createdAt và updatedAt
});

// Export model Product để sử dụng trong các service và controller
export const Product = mongoose.model<IProduct>('Product', productSchema);
