export type Quiz = {
  quiz_id: string;
  title: string;
  description: string;
  category: string;
  created_by: string;
};

export interface Question {
  question_id: string;
  quiz_id: string;
  question_text: string;
  question_type: string;
  created_at: string;
}

export interface AnswerOption {
  option_id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  created_at: string;
}

export interface UserQuiz {
  user_quiz_id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  completed_at: string | null;
}

export type QuizData = {
  user_quiz_id: string;
  score: number;
  completed_at: string;
  quiz: {
    title: string;
    category: string;
  } | null;
};