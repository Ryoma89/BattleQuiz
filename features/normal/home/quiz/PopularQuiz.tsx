import QuizCard from "@/app/components/elements/QuizCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const PopularQuiz = () => {
  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
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
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuizCard />
          <QuizCard />
          <QuizCard />
        </div>
      </div>
    </section>
  );
};

export default PopularQuiz;
