import { supabase } from "@/lib/supabase";
import { Quiz } from "@/types/Quiz";

// Define the type for UserQuiz
type UserQuiz = {
  quiz_id: string;
};

export const fetchQuizzes = async (sortBy: 'latest' | 'popular' | 'oldest'): Promise<Quiz[]> => {
  let quizzes: Quiz[] = [];

  if (sortBy === 'latest') {
    const { data, error } = await supabase
      .from('quiz')
      .select('quiz_id, title, description, category, created_by, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching latest quiz data:", error);
      return [];
    }

    quizzes = data || [];
  } else if (sortBy === 'popular') {
    // Get all UserQuiz data to calculate quiz_id counts
    const { data: userQuizData, error: userQuizError } = await supabase
      .from('userquiz')
      .select('quiz_id');

    if (userQuizError) {
      console.error("Error fetching UserQuiz data:", userQuizError);
      return [];
    }

    // Calculate the counts of each quiz_id
    const quizIdCounts = userQuizData?.reduce((acc: { [key: string]: number }, { quiz_id }: UserQuiz) => {
      if (acc[quiz_id]) {
        acc[quiz_id]++;
      } else {
        acc[quiz_id] = 1;
      }
      return acc;
    }, {}) || {};

    // Sort quiz IDs by their counts
    const sortedQuizIds = Object.keys(quizIdCounts).sort((a, b) => quizIdCounts[b] - quizIdCounts[a]);

    // Fetch the quiz data for the sorted quiz IDs
    const { data: popularQuizzes, error: popularQuizError } = await supabase
      .from('quiz')
      .select('quiz_id, title, description, category, created_by, created_at')
      .in('quiz_id', sortedQuizIds)
      .limit(4);

    if (popularQuizError) {
      console.error("Error fetching popular quiz data:", popularQuizError);
      return [];
    }

    quizzes = popularQuizzes || [];

    // If there are fewer than 4 popular quizzes, fetch the latest quizzes to fill the gap
    if (quizzes.length < 4) {
      const additionalQuizzesCount = 4 - quizzes.length;
      const { data: additionalQuizzes, error: additionalError } = await supabase
        .from('quiz')
        .select('quiz_id, title, description, category, created_by, created_at')
        .order('created_at', { ascending: false })
        .limit(additionalQuizzesCount);

      if (additionalError) {
        console.error("Error fetching additional latest quiz data:", additionalError);
        return quizzes;
      }

      quizzes = [...quizzes, ...(additionalQuizzes || [])];
    }
  } else if (sortBy === 'oldest') {
    const { data, error } = await supabase
      .from('quiz')
      .select('quiz_id, title, description, category, created_by, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching oldest quiz data:", error);
      return [];
    }

    quizzes = data || [];
  }

  return quizzes;
};
