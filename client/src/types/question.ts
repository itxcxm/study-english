/**
 * 🇻🇳 Định nghĩa kiểu dữ liệu cho câu hỏi
 * 🇻🇳 Các kiểu dữ liệu được sử dụng trong hệ thống quản lý câu hỏi của admin
 */

// 🇻🇳 Loại câu hỏi: ngữ pháp, từ vựng, hoặc thì động từ
export type QuestionCategory = 'grammar' | 'vocabulary' | 'verb-tenses';
// 🇻🇳 Độ khó của câu hỏi: dễ, trung bình, hoặc khó
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

/**
 * 🇻🇳 Kiểu dữ liệu Question - đại diện cho một câu hỏi trong hệ thống
 */
export interface Question {
  id: string; // 🇻🇳 ID duy nhất của câu hỏi
  question: string; // 🇻🇳 Nội dung câu hỏi
  options: string[]; // 🇻🇳 Mảng các lựa chọn trả lời
  correctAnswer: number; // 🇻🇳 Chỉ số của đáp án đúng (bắt đầu từ 0)
  explanation: string; // 🇻🇳 Giải thích cho đáp án đúng
  category: QuestionCategory; // 🇻🇳 Danh mục của câu hỏi
  topic: string; // 🇻🇳 Chủ đề cụ thể của câu hỏi
  difficulty: QuestionDifficulty; // 🇻🇳 Độ khó của câu hỏi
  createdAt: string; // 🇻🇳 Thời gian tạo câu hỏi
}

/**
 * 🇻🇳 Kiểu dữ liệu QuestionFormData - cấu trúc dữ liệu để gửi form
 * 🇻🇳 Tương tự Question nhưng không có id và createdAt
 */
export interface QuestionFormData {
  question: string; // 🇻🇳 Nội dung câu hỏi
  options: string[]; // 🇻🇳 Mảng các lựa chọn trả lời
  correctAnswer: number; // 🇻🇳 Chỉ số của đáp án đúng
  explanation: string; // 🇻🇳 Giải thích cho đáp án đúng
  category: QuestionCategory; // 🇻🇳 Danh mục của câu hỏi
  topic: string; // 🇻🇳 Chủ đề cụ thể của câu hỏi
  difficulty: QuestionDifficulty; // 🇻🇳 Độ khó của câu hỏi
}

