'use client';
import React, { useEffect, useRef } from "react";
import Create from "./create/Create";
import QuestionsList from "./questions/QuestionsList";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/createQuizStore";
import { useProfileStore } from "@/store/profileStore";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/User";
import { toast } from "@/components/ui/use-toast";

const CreateQuiz = ({ profile }: { profile: User }) => {
  const { title, category, description, questions, resetQuiz } = useQuizStore();
  const { Profile, setProfile } = useProfileStore();
  const createRef = useRef<{ resetSteps: () => void }>(null);

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile]);

  const handleCreateQuiz = async () => {

    if (!Profile) {
      console.log("no profile");
      return;
    }

    const userId = Profile.user_id;
    try {
      const { data: quizData, error: quizError } = await supabase
        .from("quiz")
        .insert([
          {
            title: title,
            description: description,
            category: category.join(","),
            created_by: userId,
          },
        ])
        .select();

      if (quizError) {
        console.error("Quiz insertion error:", quizError);
        throw new Error(`Error creating quiz: ${quizError.message}`);
      }

      if (!quizData || quizData.length === 0) {
        console.error("No data returned from Supabase");
        throw new Error("Error creating quiz: No data returned from Supabase");
      }

      const quizId = quizData[0].quiz_id;

      if (!quizId) {
        throw new Error("Error creating quiz: quiz_id is null");
      }

      for (const question of questions) {
        const { data: questionData, error: questionError } = await supabase
          .from("question")
          .insert([
            {
              quiz_id: quizId,
              question_text: question.question,
              question_type: question.questionType,
              time_limit: question.timeLimit,
            },
          ])
          .select();

        if (questionError) {
          console.error("Question insertion error:", questionError);
          throw new Error(`Error creating question: ${questionError.message}`);
        }

        if (!questionData || questionData.length === 0) {
          console.error("No data returned for question");
          throw new Error("Error creating question: No data returned from Supabase");
        }

        const questionId = questionData[0].question_id;

        let options = [
          {
            option_text: question.answer1,
            is_correct: question.correctAnswer.includes("answer1"),
          },
          {
            option_text: question.answer2,
            is_correct: question.correctAnswer.includes("answer2"),
          },
          question.answer3 && {
            option_text: question.answer3,
            is_correct: question.correctAnswer.includes("answer3"),
          },
          question.answer4 && {
            option_text: question.answer4,
            is_correct: question.correctAnswer.includes("answer4"),
          },
        ].filter(Boolean) as { option_text: string; is_correct: boolean }[];

        if (question.questionType === "2 answers") {
          options = [
            { option_text: "True", is_correct: question.correctAnswer.includes("True") },
            { option_text: "False", is_correct: question.correctAnswer.includes("False") },
          ];
        }

        if (question.questionType === "Type answer") {
          options = [{
            option_text: question.answer1,
            is_correct: true,
          }];
        }

        for (const option of options) {
          const { error: optionError } = await supabase
            .from("answeroption")
            .insert([
              {
                question_id: questionId,
                option_text: option.option_text,
                is_correct: option.is_correct,
              },
            ])
            .select();

          if (optionError) {
            console.error("Option insertion error:", optionError);
            throw new Error(`Error creating option: ${optionError.message}`);
          }
        }
      }

      resetQuiz();
      createRef.current?.resetSteps();
      toast({
        title: "✅ Success!!",
        description: "Quiz has been successfully submitted.",
      });
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving your quiz data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="md:grid md:grid-cols-10 md:gap-5">
      <div className="md:col-span-4 mt-3 md:mt-0">
        <QuestionsList />
      </div>
      <div className="md:col-span-6 mt-8 md:mt-0">
        <Create ref={createRef} />
        <div className="">
          <Button className="w-full mt-5" onClick={handleCreateQuiz}>
            Create Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
