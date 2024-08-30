import QuizDetail from '@/features/quiz/detail/QuizDetail'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

interface QuizPageProps {
  params: {
    id: string;
  };
}

const QuizPage: React.FC<QuizPageProps> = async ({ params }) => {
  const { id } = params;
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
    return;
  }
  // console.log("profile", profile);
  return (
    <section>
      <QuizDetail id={id} profile={profile}/>
    </section>
  )
}

export default QuizPage
