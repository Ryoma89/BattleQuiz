'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';
import { Quiz } from '@/types/Quiz';
import { User } from '@/types/User';
import { fetchQuestionCount } from '@/lib/fetch/fetchQuestionCounts';

interface QuizDetailCardProps {
  id: string;
  onStartQuiz: () => void;
}

const QuizDetailCard: React.FC<QuizDetailCardProps> = ({ id, onStartQuiz }) => {
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [creatorData, setCreatorData] = useState<User | null>(null);
  const [questionsCount, setQuestionsCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (quizId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await fetchQuizData(quizId);
      await fetchQuestionsCount(quizId);
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setIsLoading(false);
    }
  };

  const fetchQuizData = async (quizId: string) => {
    try {
      const { data: quiz, error: quizError } = await supabase
        .from('quiz')
        .select('*')
        .eq('quiz_id', quizId)
        .single();

      if (quizError) throw quizError;

      setQuizData(quiz);

      const { data: creator, error: creatorError } = await supabase
        .from('Profiles')
        .select('user_id, username, profile_picture, email')
        .eq('user_id', quiz.created_by)
        .single();

      if (creatorError) throw creatorError;

      const fullCreatorData: User = {
        user_id: creator.user_id,
        username: creator.username,
        email: creator.email || "",
        created_at: null,
        profile_picture: creator.profile_picture,
        is_first_login: null,
        account_name: null,
        introduce: null,
      };

      setCreatorData(fullCreatorData);

    } catch (error) {
      console.error('Error fetching quiz data:', error);
      throw error;
    }
  };

  const fetchQuestionsCount = async (quizId: string) => {
    try {
      const count = await fetchQuestionCount(quizId);
      setQuestionsCount(count);
    } catch (error) {
      console.error('Error fetching questions count:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const profile_picture = creatorData?.profile_picture
    ? `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/profile/${creatorData.profile_picture}`
    : `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/default_profile_picture.png`;

  return (
    <div className='mt-10'>
      <Card className="h-full w-full flex flex-col">
        <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={profile_picture} />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">{creatorData?.username || 'Unknown User'}</div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {questionsCount} questions
            </Badge>
          </div>
          <h3 className="text-xl font-bold flex-grow">{quizData?.title}</h3>
          <p className="text-muted-foreground line-clamp-2 flex-grow">{quizData?.description}</p>
          <div className="flex-grow">
            <div className="flex items-center flex-wrap gap-2">
              {quizData?.category.split(',').map((category) => (
                <Badge key={category} variant="secondary">
                  {category.trim()}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <Button className="w-full" onClick={onStartQuiz}>Start Quiz</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDetailCard;
