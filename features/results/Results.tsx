"use client";
import React from "react";
import { Pie, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/User";

interface ResultsProps {
  quizId: string;
  correct: number;
  total: number;
  profile: User;
}

const chartConfig = {
  correct: {
    label: "Correct",
    color: "hsl(var(--chart-1))",
  },
  incorrect: {
    label: "Incorrect",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Results: React.FC<ResultsProps> = ({ quizId, correct, total, profile }) => {
  const router = useRouter();

  const handleRetakeQuiz = async () => {
    if (!profile) {
      console.error('Profile is not available');
      return;
    }
  
    try {
      const { data: userQuiz, error: userQuizFetchError } = await supabase
        .from('userquiz')
        .select('user_quiz_id')
        .eq('quiz_id', quizId)
        .eq('user_id', profile.user_id)
        .single();
  
      if (userQuizFetchError || !userQuiz) {
        console.error('Error fetching user quiz data:', userQuizFetchError);
        return;
      }
  
      const userQuizId = userQuiz.user_quiz_id;

      const { error: userAnswerError } = await supabase
        .from('useranswer')
        .delete()
        .eq('user_quiz_id', userQuizId);
  
      if (userAnswerError) {
        console.error('Error deleting user answer data:', userAnswerError);
        return;
      }
  
      console.log("Attempting to delete user quiz data");
      const { error: userQuizDeleteError } = await supabase
        .from('userquiz')
        .delete()
        .eq('quiz_id', quizId)
        .eq('user_id', profile.user_id);
  
      if (userQuizDeleteError) {
        console.error('Error deleting user quiz data:', userQuizDeleteError);
        return;
      }
  
      router.push(`/quiz/${quizId}`);
    } catch (error) {
      console.error('Failed to retake quiz:', error);
    }
  };
  
  const chartData = [
    { name: "Correct", value: correct, fill: "var(--color-correct)" },
    {
      name: "Incorrect",
      value: total - correct,
      fill: "var(--color-incorrect)",
    },
  ];

  return (
    <div className="p-10">
      <h2 className="text-center text-5xl font-semibold">Results</h2>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            You answered {correct} out of {total} questions correctly.
          </div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="value" nameKey="name" />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex space-x-2">
          <Link href={`/quiz`} className="w-full">
            <Button variant="outline" className="w-full">
              Quizzes
            </Button>
          </Link>
          <Button className="w-full" onClick={handleRetakeQuiz}>
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Results;
