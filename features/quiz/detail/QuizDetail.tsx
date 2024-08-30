'use client';
import React, { useState } from "react";
import QuizDetailCard from "./QuizDetailCard";
import Questions from "../question/Questions";
import { User } from "@/types/User";
import { supabase } from "@/lib/supabase";

interface QuizDetailProps {
  id: string;
  profile: User;
}

const QuizDetail: React.FC<QuizDetailProps> = ({ id, profile }) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [userQuizId, setUserQuizId] = useState<string | null>(null);

  const handleStartQuiz = async () => {
    setQuizKey(prevKey => prevKey + 1);
    setStartQuiz(true);

    const { data, error } = await supabase
      .from('userquiz')
      .insert({
        user_id: profile.user_id,
        quiz_id: id,
        score: 0,
        completed_at: null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user quiz entry:', error);
      return;
    }
    setUserQuizId(data?.user_quiz_id ?? null);
  };

  return (
    <div className="w-4/5 mx-auto">
      {!startQuiz ? (
        <>
          <h1 className="text-3xl font-bold text-center mt-10">Start Your Quiz!</h1>
          <QuizDetailCard id={id} onStartQuiz={handleStartQuiz} />
        </>
      ) : (
        <Questions key={quizKey} quizId={id} userQuizId={userQuizId} />
      )}
    </div>
  );
};

export default QuizDetail;
