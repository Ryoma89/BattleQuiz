"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/types/Quiz";
import { User } from "@/types/User";
import { fetchQuestionCount } from "@/lib/fetch/fetchQuestionCounts";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const QuizCard: React.FC<{ quiz: Quiz, user: User }> = ({ quiz, user }) => {
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const count = await fetchQuestionCount(quiz.quiz_id);
      setQuestionCount(count);
    };

    fetchData();
  }, [quiz.quiz_id]);

  const deleteQuizData = async (quizId: string, userId: string) => {
    try {
      const { data: userQuiz, error: userQuizFetchError } = await supabase
        .from('userquiz')
        .select('user_quiz_id')
        .eq('quiz_id', quizId)
        .eq('user_id', userId);

      if (userQuizFetchError) {
        console.error('Error fetching user quiz data:', userQuizFetchError);
        return;
      }

      if (userQuiz && userQuiz.length > 0) {
        const userQuizId = userQuiz[0].user_quiz_id;

        const { error: userAnswerError } = await supabase
          .from('useranswer')
          .delete()
          .eq('user_quiz_id', userQuizId);

        if (userAnswerError) {
          console.error('Error deleting user answer data:', userAnswerError);
          return;
        }

        const { error: userQuizDeleteError } = await supabase
          .from('userquiz')
          .delete()
          .eq('quiz_id', quizId)
          .eq('user_id', userId);

        if (userQuizDeleteError) {
          console.error('Error deleting user quiz data:', userQuizDeleteError);
          return;
        }

        console.log("Successfully deleted user quiz data");
      } else {
        console.log('No user quiz data found, skipping deletion');
      }

      router.push(`/quiz/${quizId}`);
    } catch (error) {
      console.error('Failed to delete quiz data and navigate:', error);
    }
  };

  const handleTakeQuiz = async () => {
    try {
      await deleteQuizData(quiz.quiz_id, user.user_id);
    } catch (error) {
      console.error("Error in handleTakeQuiz:", error);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  user && user.profile_picture
                    ? `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/profile/${user.profile_picture}`
                    : `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/default_profile_picture.png`
                }
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              {user ? user.username : "Unknown User"}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {questionCount !== null ? questionCount : 0} questions
          </Badge>
        </div>
        <h3 className="text-xl font-bold flex-grow">{quiz.title}</h3>
        <p className="text-muted-foreground line-clamp-2 flex-grow">
          {quiz.description}
        </p>
        <div className="flex-grow">
          <div className="flex items-center flex-wrap gap-2">
            {quiz.category.split(",").map((category) => (
              <Badge key={category} variant="secondary">
                {category.trim()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Button className="bg-purple-500 w-full" onClick={handleTakeQuiz}>
            Take Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
