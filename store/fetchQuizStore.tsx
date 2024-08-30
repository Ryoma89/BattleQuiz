// stores/quizStore.ts
import { create } from "zustand";

interface QuizStore {
  quizId: string | null;
  setQuizId: (id: string) => void;
}

const useFetchQuizStore = create<QuizStore>((set) => ({
  quizId: null,
  setQuizId: (id) => set({ quizId: id }),
}));

export { useFetchQuizStore };
