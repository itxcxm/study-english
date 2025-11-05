/**
 * Question Type Definitions
 * Types for questions used in the admin review system
 */

export type QuestionCategory = 'grammar' | 'vocabulary' | 'verb-tenses';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Question type - represents a question in the system
 */
export interface Question {
  id: string;
  question: string;
  options: string[]; // Array of answer options
  correctAnswer: number; // Index of the correct answer (0-based)
  explanation: string;
  category: QuestionCategory;
  topic: string;
  difficulty: QuestionDifficulty;
  createdAt: string;
}

/**
 * QuestionFormData type - data structure for form submission
 * Similar to Question but without id and createdAt
 */
export interface QuestionFormData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: QuestionCategory;
  topic: string;
  difficulty: QuestionDifficulty;
}

