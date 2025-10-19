export class BaseRepository {
  // model: Mongoose model (ví dụ: User)
  constructor(model) {
    this.model = model;
  }

  // Tạo bản ghi mới
  async create(data) {
    return await this.model.create(data);
  }

  // Tìm bản ghi theo id
  async findById(id) {
    return await this.model.findById(id);
  }

  // Lấy tất cả bản ghi
  async findAll() {
    return await this.model.find();
  }

  // Cập nhật bản ghi theo id
  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  // Xoá bản ghi theo id
  async delete(id) {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}
