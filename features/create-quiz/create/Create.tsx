'use client'
import React, { useState } from "react";
import QuizTitle from "./QuizTitle";
import QuizContent from "./QuizContent";

type QuizData = {
  title: string;
  category: string[];
}

const Create = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({title: "", category: []});

  const handleQuizTitleSubmit = (data: {title: string; category: string[]}) => {
    setQuizData(data);
    setStep(2);
  }

  return (
    <>
      {step === 1 && <QuizTitle onSubmit={handleQuizTitleSubmit} />}
      {step === 2 && (
        <>
          <QuizContent quizData={quizData} />
        </>
      )}
    </>
  )
}

export default Create;
