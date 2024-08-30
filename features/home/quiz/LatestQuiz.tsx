'use client'
import QuizCard from "@/app/components/elements/QuizCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "@/lib/fetch/fetchQuiz";
import { Quiz } from "@/types/Quiz";
import { User } from "@/types/User";

const LatestQuiz = ({ user }: { user: User }) => {
  const [latestQuizzes, setLatestQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await fetchQuizzes('latest');
      setLatestQuizzes(quizData.slice(0, 4));
    };
    fetchData();
  }, []);

  return (
    <div className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center md:text-left">Latest Quizzes</h2>
            <p className="text-muted-foreground">
              Check out the newest quizzes on the platform.
            </p>
          </div>
          <Link href="/quiz-list" className="w-[150px]">
            <Button className="w-[150px]">View All</Button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestQuizzes.map((quiz) => (
            <QuizCard key={quiz.quiz_id} quiz={quiz} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestQuiz;
