import { ReviewRepository } from "../repositories/reviewRepositories.js";

export class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  // Lấy 20 câu hỏi ngẫu nhiên từ topic
  async getReviews(topic) {
    try {
      const reviews = await this.reviewRepository.getReviews(topic);
      return {
        success: true,
        topic: topic,
        count: reviews.length,
        data: reviews,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Lấy danh sách tất cả các topic có sẵn
  getAvailableTopics() {
    try {
      return {
        success: true,
        topics: this.reviewRepository.getAvailableTopics(),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Thêm câu hỏi mới vào topic
  async addQuestion(topic, questionData) {
    try {
      // Validate dữ liệu đầu vào
      if (
        !questionData.question ||
        !questionData.answers ||
        questionData.correctAnswer === undefined ||
        !questionData.explanation
      ) {
        throw new Error(
          "Thiếu thông tin bắt buộc: question, answers, correctAnswer, explanation"
        );
      }

      // Validate answers phải là mảng và có từ 2-6 phần tử
      if (
        !Array.isArray(questionData.answers) ||
        questionData.answers.length < 2 ||
        questionData.answers.length > 6
      ) {
        throw new Error("Answers phải là mảng chứa từ 2 đến 6 đáp án");
      }

      // Validate correctAnswer phải nằm trong khoảng index của answers
      if (
        questionData.correctAnswer < 0 ||
        questionData.correctAnswer >= questionData.answers.length
      ) {
        throw new Error(
          `correctAnswer phải nằm trong khoảng 0 đến ${
            questionData.answers.length - 1
          }`
        );
      }

      const savedQuestion = await this.reviewRepository.addQuestion(
        topic,
        questionData
      );

      return {
        success: true,
        message: "Thêm câu hỏi thành công",
        topic: topic,
        data: savedQuestion,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Lấy số lượng câu hỏi của topic
  async getQuantity(topic) {
    try {
      return await this.reviewRepository.getQuantity(topic);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Xoá câu hỏi khỏi topic
  async deleteQuestion(topic, id) {
    try {
      return await this.reviewRepository.deleteQuestion(topic, id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Cập nhật câu hỏi trong topic
  async updateQuestion(topic, id, questionData) {
    try {
      // Validate dữ liệu đầu vào
      if (
        !questionData.question ||
        !questionData.answers ||
        questionData.correctAnswer === undefined ||
        !questionData.explanation
      ) {
        throw new Error(
          "Thiếu thông tin bắt buộc: question, answers, correctAnswer, explanation"
        );
      }

      // Validate answers phải là mảng và có từ 2-6 phần tử
      if (
        !Array.isArray(questionData.answers) ||
        questionData.answers.length < 2 ||
        questionData.answers.length > 6
      ) {
        throw new Error("Answers phải là mảng chứa từ 2 đến 6 đáp án");
      }

      // Validate correctAnswer phải nằm trong khoảng index của answers
      if (
        questionData.correctAnswer < 0 ||
        questionData.correctAnswer >= questionData.answers.length
      ) {
        throw new Error(
          `correctAnswer phải nằm trong khoảng 0 đến ${
            questionData.answers.length - 1
          }`
        );
      }

      const updatedQuestion = await this.reviewRepository.updateQuestion(
        topic,
        id,
        questionData
      );

      return {
        success: true,
        message: "Cập nhật câu hỏi thành công",
        topic: topic,
        data: updatedQuestion,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
