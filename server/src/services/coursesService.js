import { CoursersRepository } from "../repositories/coursersRepositories.js";

// Service quản lý các thao tác liên quan đến Course
export class CoursesService {
  constructor() {
    // Khởi tạo repository cho Course
    this.coursersRepository = new CoursersRepository();
  }

  // Lấy danh sách tất cả khoá học
  async getCourses() {
    return await this.coursersRepository.findAllCourses();
  }

  // Lấy thông tin khoá học theo ID
  async getCourseById(id) {
    return await this.coursersRepository.findCourseById(id);
  }

  // Tạo mới một khoá học
  async createCourse(course) {
    return await this.coursersRepository.createCourse(course);
  }

  // Cập nhật thông tin khoá học
  async updateCourse(id, course) {
    return await this.coursersRepository.updateCourse(id, course);
  }

  // Xoá khoá học theo ID
  async deleteCourse(id) {
    return await this.coursersRepository.deleteCourse(id);
  }
}
