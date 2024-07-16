import CreateQuiz from '@/features/create-quiz/CreateQuiz'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const CreateQuizPage = async () => {
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

  return (
    <div className='h-full p-5 md:py-10 md:px-8'>
      <CreateQuiz profile={profile}/>
    </div>
  )
}

export default CreateQuizPage
