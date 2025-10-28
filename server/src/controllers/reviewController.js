import { Router } from "express";
import { ReviewService } from "../services/reviewServices.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

/**
 * Review Controller
 *
 * Quản lý các endpoint liên quan đến bài tập ôn tập (review questions)
 *
 * API Endpoints:
 *
 * 1. GET /api/review?topic={TopicName}
 *    - Lấy 20 câu hỏi ngẫu nhiên từ topic được chỉ định
 *    - Topic name phải khớp chính xác với tên file model (ví dụ: "Adjectives", "PresentSimple", "Family")
 *    - Trả về tối đa 20 câu hỏi, hoặc ít hơn nếu topic có ít hơn 20 câu hỏi
 *    - Ví dụ: GET /api/review?topic=Adjectives
 *
 * 2. GET /api/review/topics
 *    - Lấy danh sách tất cả các topic có sẵn trong hệ thống
 *    - Sử dụng endpoint này để biết các topic name hợp lệ
 *
 * 3. POST /api/review
 *    - Thêm câu hỏi mới vào một topic
 *    - Yêu cầu authentication
 *    - Body format:
 *    {
 *      "topic": "Adjectives",           // Tên topic (bắt buộc)
 *      "question": "...",                // Câu hỏi (bắt buộc)
 *      "answers": ["ans1", "ans2", ...], // Mảng 2-6 đáp án (bắt buộc)
 *      "correctAnswer": 0,               // Index của đáp án đúng (bắt buộc)
 *      "explanation": "..."              // Giải thích (bắt buộc)
 *    }
 *
 * Response Format (GET):
 * {
 *   success: true,
 *   topic: "Adjectives",
 *   count: 20,
 *   data: [
 *     {
 *       _id: "...",
 *       question: "Choose the correct adjective...",
 *       answers: ["good", "well", "better", "best"],
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
 * Response Format (POST):
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
    // Lấy danh sách tất cả các topic có sẵn
    this.router.get("/topics", authMiddleware, adminMiddleware, this.getAvailableTopics);

    // Lấy 20 câu hỏi ngẫu nhiên theo topic
    this.router.get("/", authMiddleware, this.getReviews);

    // Thêm câu hỏi mới vào topic
    this.router.post("/", authMiddleware, adminMiddleware, this.addQuestion);

    // Lấy số lượng câu hỏi của topic
    this.router.get("/quantity", authMiddleware, this.getQuantity);

    // Xoá câu hỏi khỏi topic
    this.router.delete("/:id", authMiddleware, adminMiddleware, this.deleteQuestion);
  }

  // Lấy 20 câu hỏi ngẫu nhiên từ topic (model file name phải khớp với topic name)
  getReviews = async (req, res) => {
    try {
      const { topic } = req.query;

      // Kiểm tra topic có được cung cấp không
      if (!topic) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Tham số 'topic' là bắt buộc. Ví dụ: ?topic=Adjectives",
        });
      }

      // Lấy 20 câu hỏi ngẫu nhiên
      const result = await this.reviewService.getReviews(topic);

      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Lấy danh sách tất cả các topic có sẵn
  getAvailableTopics = async (req, res) => {
    try {
      const result = this.reviewService.getAvailableTopics();
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };

  // Thêm câu hỏi mới vào topic
  addQuestion = async (req, res) => {
    try {
      const { topic, question, answers, correctAnswer, explanation } = req.body;

      // Validate dữ liệu đầu vào
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

      // Thêm câu hỏi mới
      const result = await this.reviewService.addQuestion(topic, {
        question,
        answers,
        correctAnswer,
        explanation,
      });

      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  };
  getQuantity = async (req, res) => {
    try {
      const result = await this.reviewService.getQuantity(topic);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  deleteQuestion = async (req, res) => {
    try {
      const result = await this.reviewService.deleteQuestion(topic);
      return result;
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
