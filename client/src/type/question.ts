export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: 'grammar' | 'vocabulary' | 'verb-tenses';
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    createdAt: string;
  }
  
  export type QuestionFormData = Omit<Question, 'id' | 'createdAt'>;
  