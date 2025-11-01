// Import các models và danh sách topic có sẵn từ index
import { models, availableTopics } from "../models/index.js";

/**
 * Repository Review
 *
 * Quản lý các thao tác database liên quan đến câu hỏi ôn tập (review questions)
 * Mỗi topic có một model riêng trong MongoDB (ví dụ: Animals, PresentSimple, Adjectives)
 */
export class ReviewRepository {
  /**
   * Khởi tạo repository
   *
   * @constructor
   * Gán models và availableTopics từ module index
   */
  constructor() {
    // Danh sách tất cả các models (tương ứng với các topic)
    this.models = models;
    // Danh sách tên các topic có sẵn
    this.availableTopics = availableTopics;
  }

  /**
   * Lấy 20 câu hỏi ngẫu nhiên từ topic
   *
   * @param {string} topic - Tên topic cần lấy câu hỏi (ví dụ: "Animals", "PresentSimple")
   * @returns {Promise<Array>} - Mảng chứa tối đa 20 câu hỏi ngẫu nhiên
   * @throws {Error} - Nếu topic không tồn tại hoặc có lỗi khi truy vấn
   */
  async getReviews(topic) {
    try {
      // Kiểm tra topic có tồn tại trong danh sách models không
      if (!this.models[topic]) {
        // Nếu không tồn tại, throw error với danh sách topic hợp lệ
        throw new Error(
          `Topic "${topic}" không tồn tại. Các topic có sẵn: ${this.availableTopics.join(
            ", "
          )}`
        );
      }

      // Lấy model tương ứng với topic
      const Model = this.models[topic];

      // Đếm tổng số câu hỏi đang active trong topic này
      const totalCount = await Model.countDocuments({ isActive: true });

      // Nếu không có câu hỏi nào, trả về mảng rỗng
      if (totalCount === 0) {
        return [];
      }

      // Xác định số lượng câu hỏi cần lấy (tối đa 20, hoặc tổng số nếu ít hơn 20)
      const limit = Math.min(20, totalCount);

      // Sử dụng MongoDB aggregation pipeline để lấy câu hỏi ngẫu nhiên:
      // - $match: Lọc chỉ lấy câu hỏi có isActive = true
      // - $sample: Lấy ngẫu nhiên số lượng câu hỏi theo limit
      const reviews = await Model.aggregate([
        { $match: { isActive: true } },
        { $sample: { size: limit } },
      ]);

      // Trả về mảng câu hỏi
      return reviews;
    } catch (error) {
      // Bắt và throw lại error với message
      throw new Error(error.message);
    }
  }

  /**
   * Lấy danh sách tất cả các topic có sẵn trong hệ thống
   *
   * @returns {Array<string>} - Mảng chứa tên các topic (ví dụ: ["Animals", "PresentSimple", "Adjectives"])
   */
  getAvailableTopics() {
    // Trả về danh sách topic đã được import từ index
    return this.availableTopics;
  }

  /**
   * Thêm câu hỏi mới vào topic
   *
   * @param {string} topic - Tên topic cần thêm câu hỏi (ví dụ: "Animals", "PresentSimple")
   * @param {Object} questionData - Dữ liệu câu hỏi bao gồm:
   *   @param {string} questionData.question - Nội dung câu hỏi
   *   @param {Array<string>} questionData.answers - Mảng các đáp án (2-6 phần tử)
   *   @param {number} questionData.correctAnswer - Index của đáp án đúng (0-based)
   *   @param {string} questionData.explanation - Giải thích đáp án đúng
   *   @param {string} [questionData.difficulty] - Độ khó: "easy", "medium", "hard" (mặc định: "medium")
   * @returns {Promise<Object>} - Câu hỏi đã được lưu vào database
   * @throws {Error} - Nếu topic không tồn tại hoặc có lỗi khi lưu
   */
  async addQuestion(topic, questionData) {
    try {
      // Kiểm tra topic có tồn tại trong danh sách models không
      if (!this.models[topic]) {
        // Nếu không tồn tại, throw error với danh sách topic hợp lệ
        throw new Error(
          `Topic "${topic}" không tồn tại. Các topic có sẵn: ${this.availableTopics.join(
            ", "
          )}`
        );
      }

      // Lấy model tương ứng với topic
      const Model = this.models[topic];

      // Tạo instance mới của câu hỏi với dữ liệu đã được validate ở service layer
      const newQuestion = new Model({
        question: questionData.question, // Nội dung câu hỏi
        answers: questionData.answers, // Mảng các đáp án
        correctAnswer: questionData.correctAnswer, // Index đáp án đúng
        explanation: questionData.explanation, // Giải thích
        difficulty: questionData.difficulty || "medium", // Độ khó (mặc định: medium)
        isActive: true, // Đánh dấu câu hỏi đang active
      });

      // Lưu câu hỏi vào database (Mongoose sẽ tự động validate theo schema)
      const savedQuestion = await newQuestion.save();

      // Trả về câu hỏi đã được lưu (có thêm _id và timestamps)
      return savedQuestion;
    } catch (error) {
      // Bắt và throw lại error với message
      throw new Error(error.message);
    }
  }

  /**
   * Lấy số lượng câu hỏi đang active của topic
   *
   * @param {string} topic - Tên topic cần đếm số lượng câu hỏi
   * @returns {Promise<number>} - Số lượng câu hỏi có isActive = true
   * @throws {Error} - Nếu có lỗi khi đếm hoặc topic không tồn tại
   */
  async getQuantity(topic) {
    try {
      // Lấy model tương ứng với topic
      const Model = this.models[topic];

      // Đếm số lượng documents có isActive = true
      return await Model.countDocuments({ isActive: true });
    } catch (error) {
      // Bắt và throw lại error với message
      throw new Error(error.message);
    }
  }

  /**
   * Xóa câu hỏi khỏi topic (soft delete - đánh dấu isActive = false)
   *
   * @param {string} topic - Tên topic chứa câu hỏi cần xóa
   * @param {string} id - MongoDB _id của câu hỏi cần xóa
   * @returns {Promise<Object|null>} - Câu hỏi đã được cập nhật hoặc null nếu không tìm thấy
   * @throws {Error} - Nếu có lỗi khi xóa hoặc topic không tồn tại
   *
   * Lưu ý: Không xóa thực sự khỏi database, chỉ đánh dấu isActive = false
   * để có thể khôi phục sau này nếu cần
   */
  async deleteQuestion(topic, id) {
    try {
      // Lấy model tương ứng với topic
      const Model = this.models[topic];

      // Tìm câu hỏi theo id và cập nhật isActive = false (soft delete)
      // Không cần validate vì chỉ cập nhật một trường boolean
      return await Model.findByIdAndUpdate(id, { isActive: false });
    } catch (error) {
      // Bắt và throw lại error với message
      throw new Error(error.message);
    }
  }

  /**
   * Cập nhật câu hỏi trong topic
   *
   * @param {string} topic - Tên topic chứa câu hỏi cần cập nhật
   * @param {string} id - MongoDB _id của câu hỏi cần cập nhật
   * @param {Object} questionData - Dữ liệu câu hỏi mới bao gồm:
   *   @param {string} questionData.question - Nội dung câu hỏi
   *   @param {Array<string>} questionData.answers - Mảng các đáp án (2-6 phần tử)
   *   @param {number} questionData.correctAnswer - Index của đáp án đúng (0-based)
   *   @param {string} questionData.explanation - Giải thích đáp án đúng
   *   @param {string} [questionData.difficulty] - Độ khó: "easy", "medium", "hard"
   * @returns {Promise<Object>} - Câu hỏi đã được cập nhật
   * @throws {Error} - Nếu topic không tồn tại, không tìm thấy câu hỏi, hoặc validation fail
   *
   * Lưu ý: Sử dụng findById + save() thay vì findByIdAndUpdate để validator có đầy đủ context
   * vì validator của correctAnswer cần truy cập this.answers.length
   */
  async updateQuestion(topic, id, questionData) {
    try {
      // Kiểm tra topic có tồn tại trong danh sách models không
      if (!this.models[topic]) {
        // Nếu không tồn tại, throw error với danh sách topic hợp lệ
        throw new Error(
          `Topic "${topic}" không tồn tại. Các topic có sẵn: ${this.availableTopics.join(
            ", "
          )}`
        );
      }

      // Lấy model tương ứng với topic
      const Model = this.models[topic];

      // Tìm câu hỏi trong database theo id
      const question = await Model.findById(id);

      // Kiểm tra xem câu hỏi có tồn tại không
      if (!question) {
        throw new Error("Không tìm thấy câu hỏi với id đã cho");
      }

      // Cập nhật từng trường của câu hỏi với dữ liệu mới
      question.question = questionData.question; // Cập nhật nội dung câu hỏi
      question.answers = questionData.answers; // Cập nhật mảng đáp án
      question.correctAnswer = questionData.correctAnswer; // Cập nhật index đáp án đúng
      question.explanation = questionData.explanation; // Cập nhật giải thích

      // Chỉ cập nhật difficulty nếu được truyền vào (có thể không thay đổi)
      if (questionData.difficulty) {
        question.difficulty = questionData.difficulty;
      }

      // Validate document với đầy đủ context (quan trọng để validator của correctAnswer
      // có thể truy cập this.answers.length)
      await question.validate();

      // Lưu document đã được cập nhật vào database
      const updatedQuestion = await question.save();

      // Trả về câu hỏi đã được cập nhật (có thêm updatedAt mới)
      return updatedQuestion;
    } catch (error) {
      // Bắt và throw lại error với message
      throw new Error(error.message);
    }
  }
}
