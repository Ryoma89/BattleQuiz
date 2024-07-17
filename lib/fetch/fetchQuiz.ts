import { supabase } from "@/lib/supabase";
import { Quiz } from "@/types/Quiz";

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const { data: quizzes, error: quizError } = await supabase
    .from("quiz")
    .select("quiz_id, title, description, category, created_by");

  if (quizError) {
    console.error("Error fetching quiz data:", quizError);
    return [];
  }

  return quizzes;
};
