'use client'
import QuizCard from "@/app/components/elements/QuizCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "@/lib/fetch/fetchQuiz";
import { Quiz } from "@/types/Quiz";
import { User } from '@/types/User';

const PopularQuiz = ({ user }: { user: User }) => {
  const [popularQuizzes, setPopularQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await fetchQuizzes('popular');
        if (quizData.length === 0) {
          setError("No popular quizzes found.");
        } else {
          setPopularQuizzes(quizData.slice(0, 4));
        }
      } catch (err) {
        setError("Failed to fetch popular quizzes.");
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-center md:text-left">Popular Quizzes</h2>
            <p className="text-muted-foreground">
              Check out the most popular quizzes on the platform.
            </p>
          </div>
          <Link href="/quiz-list" className="w-[150px]">
            <Button className="w-[150px]">View All</Button>
          </Link>
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularQuizzes.map((quiz) => (
              <QuizCard key={quiz.quiz_id} quiz={quiz} user={user} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularQuiz;
