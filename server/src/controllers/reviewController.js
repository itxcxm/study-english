import { Router } from "express";
import { ReviewService } from "../services/reviewServices.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

/**
 * Controller Review
 *
 * Quản lý các endpoint liên quan đến ôn tập (review questions)
 *
 * Các API Endpoint:
 *
 * 1. GET /api/review?topic={TopicName}
 *    - Lấy 20 câu hỏi ngẫu nhiên từ topic được chỉ định
 *    - Tên topic phải trùng khớp với tên model (ví dụ: "Adjectives", "PresentSimple", "Family")
 *    - Trả về tối đa 20 câu hỏi hoặc ít hơn nếu số lượng không đủ
 *    - Ví dụ: GET /api/review?topic=Adjectives
 *
 * 2. GET /api/review/topics
 *    - Lấy danh sách tất cả các topic có sẵn trong hệ thống
 *    - Sử dụng endpoint này để biết các topic hợp lệ
 *
 * 3. POST /api/review
 *    - Thêm câu hỏi mới vào topic
 *    - Yêu cầu xác thực (authentication)
 *    - Dạng body:
 *    {
 *      "topic": "Adjectives",           // Tên topic (bắt buộc)
 *      "question": "...",                // Câu hỏi (bắt buộc)
 *      "answers": ["ans1", "ans2", ...], // Mảng 2-6 đáp án (bắt buộc)
 *      "correctAnswer": 0,               // Index đáp án đúng (bắt buộc)
 *      "explanation": "..."              // Giải thích (bắt buộc)
 *    }
 *
 * Format trả về (GET):
 * {
 *   success: true,
 *   topic: "Adjectives",
 *   count: 20,
 *   data: [
 *     {
 *       _id: "...",
 *       question: "...",
 *       answers: ["...", "...", ...],
 *       correctAnswer: 0,
 *       explanation: "...",
 *       isActive: true,
 *       createdAt: "...",
 *       updatedAt: "..."
 *     },
 *     ...
 *   ]
 * }
 *
 * Format trả về (POST):
 * {
 *   success: true,
 *   message: "Thêm câu hỏi thành công",
 *   topic: "Adjectives",
 *   data: { ... }
 * }
 */
export class ReviewController {
  constructor() {
    this.router = Router();
    this.reviewService = new ReviewService();
    this.initializeRoutes();
  }

  // Khởi tạo các route cho review
  initializeRoutes() {
    // Lấy danh sách topic có sẵn (yêu cầu quyền admin)
    this.router.get("/topics", authMiddleware, adminMiddleware, this.getAvailableTopics);

    // Lấy 20 câu hỏi ngẫu nhiên theo topic (yêu cầu đăng nhập)
    this.router.get("/", authMiddleware, this.getReviews);

    // Thêm câu hỏi mới vào topic (yêu cầu quyền admin)
    this.router.post("/", authMiddleware, adminMiddleware, this.addQuestion);

    // Lấy số lượng câu hỏi của topic (yêu cầu đăng nhập)
    this.router.get("/quantity", authMiddleware, this.getQuantity);

    // Xoá câu hỏi khỏi topic (yêu cầu quyền admin)
    this.router.delete("/:id", authMiddleware, adminMiddleware, this.deleteQuestion);
  }

  // Lấy 20 câu hỏi ngẫu nhiên theo topic
  getReviews = async (req, res) => {
    try {
      const { topic } = req.query;

      // Kiểm tra topic được truyền vào
      if (!topic) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Tham số 'topic' là bắt buộc. Ví dụ: ?topic=Adjectives",
        });
      }

      // Gọi service lấy dữ liệu
      const result = await this.reviewService.getReviews(topic);

      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      // Lỗi server
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Lấy danh sách topic có sẵn
  getAvailableTopics = async (req, res) => {
    try {
      const result = this.reviewService.getAvailableTopics();
      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Thêm câu hỏi mới vào topic
  addQuestion = async (req, res) => {
    try {
      const { topic, question, answers, correctAnswer, explanation } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!topic) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Tham số 'topic' là bắt buộc",
        });
      }

      if (
        !question ||
        !answers ||
        correctAnswer === undefined ||
        !explanation
      ) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message:
            "Thiếu thông tin bắt buộc: question, answers, correctAnswer, explanation",
        });
      }

      // Thêm câu hỏi mới vào topic
      const result = await this.reviewService.addQuestion(topic, {
        question,
        answers,
        correctAnswer,
        explanation,
      });

      return res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Lấy số lượng câu hỏi của topic
  getQuantity = async (req, res) => {
    try {
      const { topic } = req.query; // Lấy topic từ query
      if (!topic) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Tham số 'topic' là bắt buộc để đếm số lượng câu hỏi.",
        });
      }
      const result = await this.reviewService.getQuantity(topic);
      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Xóa câu hỏi khỏi topic
  deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params; // Lấy id từ URL param
      if (!id) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Thiếu id của câu hỏi cần xoá.",
        });
      }
      const result = await this.reviewService.deleteQuestion(id);
      return res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };
}
