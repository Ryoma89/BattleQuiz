'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useQuizStore } from '@/store/createQuizStore';

interface QuestionsProps {
  quizId: string;
  userQuizId: string | null;
}

interface Question {
  question_id: string;
  question_text: string;
  question_type: string;
  time_limit: number;
}

interface AnswerOption {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

const Questions: React.FC<QuestionsProps> = ({ quizId, userQuizId }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerOptions, setAnswerOptions] = useState<AnswerOption[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const typeAnswerRef = useRef<string>('');
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // const resetQuiz = useQuizStore((state) => state.resetQuiz); 

  const fetchQuestionsData = useCallback(async () => {
    try {
      setLoading(true);

      const { data: questionsData, error: questionsError } = await supabase
        .from('question')
        .select('question_id, question_text, question_type, time_limit')
        .eq('quiz_id', quizId);

      if (questionsError) throw questionsError;

      setQuestions(questionsData);

      if (questionsData.length > 0) {
        fetchAnswerOptions(questionsData[0].question_id);
        setTimeLeft(questionsData[0].time_limit);
      }
    } catch (error) {
      console.error('Error fetching questions data:', error);
      setError('Error fetching questions data');
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    fetchQuestionsData();
  }, [fetchQuestionsData]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && questions.length > 0) {
      handleNextQuestion(correctAnswers);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, questions.length, correctAnswers]);

  const fetchAnswerOptions = useCallback(async (questionId: string) => {
    try {
      const { data: answerOptionsData, error: answerOptionsError } = await supabase
        .from('answeroption')
        .select('option_id, option_text, is_correct')
        .eq('question_id', questionId);

      if (answerOptionsError) throw answerOptionsError;

      setAnswerOptions(answerOptionsData);
    } catch (error) {
      console.error('Error fetching answer options:', error);
      setError('Error fetching answer options');
    }
  }, []);

  const saveUserAnswer = async (questionId: string, selectedOptionId: string) => {
    if (!userQuizId) return;

    const { error } = await supabase
      .from('useranswer')
      .insert({
        user_quiz_id: userQuizId,
        question_id: questionId,
        selected_option_id: selectedOptionId
      });

    if (error) {
      console.error('Error saving user answer:', error);
    }
  };

  const handleAnswerClick = async (option: AnswerOption) => {
    setSelectedAnswer(option.option_text);
    const isCorrect = option.is_correct;

    if (isCorrect) {
      toast({
        title: "✅ Correct!!",
        description: "You answered the question correctly.",
      });
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      await saveUserAnswer(questions[currentQuestionIndex].question_id, option.option_id);
      handleNextQuestion(newCorrectAnswers);
    } else {
      toast({
        title: "Incorrect.",
        description: "Unfortunately, your answer is incorrect.",
        variant: "destructive",
      });
      await saveUserAnswer(questions[currentQuestionIndex].question_id, option.option_id);
      handleNextQuestion(correctAnswers);
    }
  };

  const handleTypeAnswerSubmit = async () => {
    const correctOption = answerOptions.find(option => option.is_correct);
    const isCorrect = correctOption && typeAnswerRef.current.trim().toLowerCase() === correctOption.option_text.trim().toLowerCase();

    if (isCorrect) {
      toast({
        title: "✅ Correct!!",
        description: "You answered the question correctly.",
      });
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      if (correctOption) {
        await saveUserAnswer(questions[currentQuestionIndex].question_id, correctOption.option_id);
      }
      handleNextQuestion(newCorrectAnswers);
    } else {
      toast({
        title: "Incorrect.",
        description: "Unfortunately, your answer is incorrect.",
        variant: "destructive"
      });
      if (correctOption) {
        await saveUserAnswer(questions[currentQuestionIndex].question_id, correctOption.option_id);
      }
      handleNextQuestion(correctAnswers);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswerOptions([]);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setTimeLeft(0);
    setError(null);
    setLoading(false);
  };

  const handleNextQuestion = useCallback(async (updatedCorrectAnswers: number) => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      fetchAnswerOptions(questions[nextIndex].question_id);
      setSelectedAnswer(null);
      typeAnswerRef.current = '';
      setTimeLeft(questions[nextIndex].time_limit);
    } else {
      toast({
        title: "✅ Well done!!",
        description: `You have completed the quiz. You answered ${updatedCorrectAnswers} out of ${questions.length} questions correctly.`,
      });

      if (userQuizId) {
        await supabase
          .from('userquiz')
          .update({ score: updatedCorrectAnswers, completed_at: new Date() })
          .eq('user_quiz_id', userQuizId);
      }

      resetQuiz();

      router.push(`/results?quizId=${quizId}&correct=${updatedCorrectAnswers}&total=${questions.length}`);
    }
  }, [currentQuestionIndex, fetchAnswerOptions, questions.length, router, userQuizId, quizId]);

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className='text-center'>
        <p>No questions available for this quiz.</p>
      </div>
    );
  }

  const renderAnswers = () => {
    switch (questions[currentQuestionIndex]?.question_type) {
      case '4 answers':
        return (
          <div className='grid grid-cols-2 grid-rows-2 h-full'>
            {answerOptions.map((option, index) => (
              <div key={index}>
                <Button
                  className='w-full h-full rounded-none'
                  variant={'outline'}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option.option_text}
                </Button>
              </div>
            ))}
          </div>
        );
      case '2 answers':
        return (
          <div className='grid grid-cols-2 h-full'>
            {answerOptions.map((option, index) => (
              <Button
                key={index}
                className={`w-full h-full rounded-lg ${option.option_text === 'True' ? 'bg-red-600 text-white' : 'bg-blue-700 text-white'}`}
                variant={'outline'}
                onClick={() => handleAnswerClick(option)}
              >
                {option.option_text}
              </Button>
            ))}
          </div>
        );
      case 'Type answer':
        return (
          <div className='h-full flex flex-col justify-center items-center'>
            <Textarea
              placeholder='Type your answer'
              className='w-full rounded-none'
              onChange={(e) => (typeAnswerRef.current = e.target.value)}
            />
            <Button className='mt-10' onClick={handleTypeAnswerSubmit}>
              Submit
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='overflow-auto' style={{ height: 'calc(100vh - 148px)' }}>
      <div className='text-5xl font-bold text-center my-10'>{timeLeft}</div>
      <Card className='h-4/5 w-full grid grid-rows-10'>
        <CardHeader className='my-5 row-span-4 flex items-center justify-center'>
          <CardTitle className=''>
            <span className='font-bold'>Q{currentQuestionIndex + 1}: </span>
            {questions[currentQuestionIndex]?.question_text || 'Loading question...'}
          </CardTitle>
        </CardHeader>
        <CardContent className='row-span-5'>{renderAnswers()}</CardContent>
      </Card>
    </div>
  );
};

export default Questions;
