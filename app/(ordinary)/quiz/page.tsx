import QuizList from '@/features/quiz-list/QuizList'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const QuizListPage = async () => {
  const supabase = await createClient();

  // ログインしているか確認
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // プロフィール情報を取得
  const { data: profileInfo, error: profileError } = await supabase
    .from('Profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
    return;
  }

  return (
    <section className='h-full p-5 overflow-scroll md:py-10 md:px-8'>
      <QuizList profileInfo={profileInfo}/>
    </section>
  )
}

export default QuizListPage
