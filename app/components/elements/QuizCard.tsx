'use client';
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Quiz } from "@/types/Quiz";
import { CardUser } from "@/types/User";
import { fetchUserData } from "@/lib/fetch/fetchUserData";
import { fetchQuestionCount } from "@/lib/fetch/fetchQuestionCounts";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const [user, setUser] = useState<CardUser | null>(null);
  const [questionCount, setQuestionCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await fetchUserData(quiz.created_by);
      setUser(fetchedUser);

      const count = await fetchQuestionCount(quiz.quiz_id);
      setQuestionCount(count);
    };

    fetchData();
  }, [quiz.created_by, quiz.quiz_id]);

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  user?.profile_picture
                    ? `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/profile/${user.profile_picture}`
                    : `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/default_profile_picture.png`
                }
              />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              {user?.username || "Unknown User"}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {questionCount !== null ? questionCount : 0} questions
          </Badge>
        </div>
        <h3 className="text-xl font-bold flex-grow">{quiz.title}</h3>
        <p className="text-muted-foreground line-clamp-2 flex-grow">{quiz.description}</p>
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
          <Button className="bg-purple-500 w-full">Take Quiz</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
