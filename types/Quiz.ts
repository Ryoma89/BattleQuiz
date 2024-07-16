export interface Quiz {
  quiz_id: number;
  title: string;
  description: string;
  category: string;
  created_by: string;
  created_at: string;
}

export interface Question {
  question_id: number;
  quiz_id: number;
  question_text: string;
  question_type: string;
  created_at: string;
}

export interface AnswerOption {
  option_id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  created_at: string;
}
