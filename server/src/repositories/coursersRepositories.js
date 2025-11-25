import { BaseRepository } from "./baseRepository.js";
import { Course } from "../models/Course.js";

// Repository thao tác với bảng Course
export class CoursersRepository extends BaseRepository {
  constructor() {
    // Gọi constructor cha, gắn model Course
    super(Course);
  }

  // Lấy tất cả khoá học
  async findAllCourses() {
    return await this.findAll();
  }

  // Tìm khoá học theo ID
  async findCourseById(id) {
    return await this.findById(id);
  }

  // Tạo mới khoá học
  async createCourse(course) {
    return await this.create(course);
  }

  // Cập nhật khoá học theo ID
  async updateCourse(id, course) {
    return await this.update(id, course);
  }

  // Xoá khoá học theo ID
  async deleteCourse(id) {
    return await this.delete(id);
  }
}
