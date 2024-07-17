"use client";
import React, { useState, useImperativeHandle, forwardRef } from "react";
import QuizTitle from "./QuizTitle";
import QuizContent from "./QuizContent";

type QuizData = {
  title: string;
  category: string[];
};

const Create = forwardRef((props, ref) => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({ title: "", category: [] });

  useImperativeHandle(ref, () => ({
    resetSteps() {
      setStep(1);
      setQuizData({ title: "", category: [] });
    }
  }));

  const handleQuizTitleSubmit = (data: { title: string; category: string[] }) => {
    setQuizData(data);
    setStep(2);
  };

  return (
    <>
      {step === 1 && <QuizTitle onSubmit={handleQuizTitleSubmit} />}
      {step === 2 && (
        <>
          <QuizContent quizData={quizData} />
        </>
      )}
    </>
  );
});

export default Create;
