import { Router } from "express";
import { CoursesService } from "../services/coursesService.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

export class CoursesController {
  constructor() {
    this.router = Router();
    this.coursesService = new CoursesService();
    this.initializeRoutes();
  }
  
  // Khởi tạo các route cho Courses
  initializeRoutes() {
    // Lấy danh sách tất cả courses đẻ hiện thị trên Home
    this.router.get("/", this.getCourses);
    // Lấy thông tin course theo id để hiện thị trên trang chi tiết khóa học
    this.router.get("/:id", this.getCourseById);
    // Tạo mới course (chỉ admin)
    this.router.post("/", authMiddleware, adminMiddleware, this.createCourse);
        // Cập nhật thông tin course (chỉ admin)
    this.router.put("/:id", authMiddleware, adminMiddleware, this.updateCourse);
    // Xóa course (chỉ admin)
    this.router.delete("/:id", authMiddleware, adminMiddleware, this.deleteCourse);
  }
  
  getCourses = async (req, res) => {
    try {
      const courses = await this.coursesService.getCourses();
      res.status(HTTP_STATUS.OK).json(courses);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  getCourseById = async (req, res) => {
    try {
      const course = await this.coursesService.getCourseById(req.params.id);
      res.status(HTTP_STATUS.OK).json(course);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  createCourse = async (req, res) => {
    try {
      const course = await this.coursesService.createCourse(req.body);
      res.status(HTTP_STATUS.CREATED).json(course);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  updateCourse = async (req, res) => {
    try {
      const course = await this.coursesService.updateCourse(req.params.id, req.body);
      res.status(HTTP_STATUS.OK).json(course);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  deleteCourse = async (req, res) => {
    try {
      await this.coursesService.deleteCourse(req.params.id);
      res.status(HTTP_STATUS.OK).json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
