import { create } from "zustand";

interface Question {
  question: string;
  questionType: "4 answers" | "2 answers" | "Type answer";
  timeLimit: number;
  answer1: string;
  answer2: string;
  answer3?: string;
  answer4?: string;
  correctAnswer: string[];
}

interface QuizState {
  title: string;
  description: string;
  category: string[];
  questions: Question[];
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: string[]) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (index: number) => void;
  setQuestionToEdit: (index: number | null) => void;
  clearQuestionToEdit: () => void;
  questionToEdit: Question | null;
  questionToEditIndex: number | null;
}

const useQuizStore = create<QuizState>((set) => ({
  title: '',
  description: '',
  category: [],
  questions: [],
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setCategory: (category) => set({ category }),
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (index, question) =>
    set((state) => {
      const questions = [...state.questions];
      questions[index] = question;
      return { questions };
    }),
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  setQuestionToEdit: (index) => set((state) => ({
    questionToEdit: index !== null ? state.questions[index] : null,
    questionToEditIndex: index,
  })),
  clearQuestionToEdit: () => set(() => ({
    questionToEdit: null,
    questionToEditIndex: null,
  })),
  questionToEdit: null,
  questionToEditIndex: null,
}));

export { useQuizStore };
