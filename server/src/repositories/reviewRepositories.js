import { models, availableTopics } from "../models/index.js";

export class ReviewRepository {
  constructor() {
    this.models = models;
    this.availableTopics = availableTopics;
  }

  // Lấy 20 câu hỏi ngẫu nhiên từ topic
  async getReviews(topic) {
    try {
      // Kiểm tra topic có tồn tại không
      if (!this.models[topic]) {
        throw new Error(
          `Topic "${topic}" không tồn tại. Các topic có sẵn: ${this.availableTopics.join(
            ", "
          )}`
        );
      }

      const Model = this.models[topic];

      // Lấy tổng số câu hỏi active
      const totalCount = await Model.countDocuments({ isActive: true });

      if (totalCount === 0) {
        return [];
      }

      // Nếu có ít hơn 20 câu hỏi, trả về tất cả
      const limit = Math.min(20, totalCount);

      // Lấy 20 câu hỏi ngẫu nhiên bằng aggregation pipeline
      const reviews = await Model.aggregate([
        { $match: { isActive: true } },
        { $sample: { size: limit } },
      ]);

      return reviews;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Lấy danh sách tất cả các topic có sẵn
  getAvailableTopics() {
    return this.availableTopics;
  }

  // Thêm câu hỏi mới vào topic
  async addQuestion(topic, questionData) {
    try {
      // Kiểm tra topic có tồn tại không
      if (!this.models[topic]) {
        throw new Error(
          `Topic "${topic}" không tồn tại. Các topic có sẵn: ${this.availableTopics.join(
            ", "
          )}`
        );
      }

      const Model = this.models[topic];

      // Tạo câu hỏi mới
      const newQuestion = new Model({
        question: questionData.question,
        answers: questionData.answers,
        correctAnswer: questionData.correctAnswer,
        explanation: questionData.explanation,
        isActive: true,
      });

      // Lưu vào database
      const savedQuestion = await newQuestion.save();
      return savedQuestion;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Lấy số lượng câu hỏi của topic
  async getQuantity(topic) {
    try {
      const Model = this.models[topic];
      return await Model.countDocuments({ isActive: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Xoá câu hỏi khỏi topic
  async deleteQuestion(topic, id) {
    try {
      const Model = this.models[topic];
      return await Model.findByIdAndUpdate(id, { isActive: false });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
