import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CreateQuiz = () => {
  return (
    <div className="py-12 px-6">
      <div className="text-center space-y-5">
        <h2 className="text-2xl font-bold">Ready to Create Your Own Quiz?</h2>
        <p className="text-muted-foreground">
          Unleash your creativity and share your knowledge with others.
        </p>
        <Link href="/quiz/create">
          <Button className="max-w-xs mt-5">Create a Quiz</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateQuiz;
