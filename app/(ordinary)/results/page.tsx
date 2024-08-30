import Results from '@/features/results/Results';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface ResultsPageProps {
  searchParams: {
    quizId: string;
    correct: string;
    total: string;
  };
}

const ResultsPage = async ({ searchParams }: ResultsPageProps) => {
  const { quizId, correct, total } = searchParams;
  console.log("quizId", quizId);
  console.log("correct", correct);
  console.log("total", total);

  const correctAnswers = parseInt(correct || "0", 10);
  const totalQuestions = parseInt(total || "0", 10);

  
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) {
    return redirect('/login');
  }

  // プロフィール情報を取得
  const { data: profile, error: error } = await supabase
    .from('Profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return (
      <div>Error fetching profile</div>
    );
  }

  return (
    <section>
      <Results quizId={quizId} correct={correctAnswers} total={totalQuestions} profile={profile} />
    </section>
  );
};

export default ResultsPage;
