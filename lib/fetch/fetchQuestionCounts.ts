import { supabase } from "@/lib/supabase";

export const fetchQuestionCount = async (quizId: number): Promise<number | null> => {
  const { count, error: questionCountError } = await supabase
    .from("question")
    .select("question_id", { count: "exact" })
    .eq("quiz_id", quizId);

  if (questionCountError) {
    console.error(`Error fetching question count for quiz ${quizId}:`, questionCountError);
    return null;
  }

  return count || 0;
};
