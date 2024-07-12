import Setup from '@/features/ordinary/setup-profile/normal/setup-profile/Setup';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

const SetUpPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) {
    return redirect('/login');
  }

  // プロフィール情報を取得
  const { data: profile, error } = await supabase
    .from('Profiles')
    .select('is_first_login')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    // プロフィールの取得に失敗した場合、適切なエラーハンドリングを追加
    return;
  }

  if (profile && !profile.is_first_login) {
    // is_first_login が false の場合、ホームページにリダイレクト
    return redirect('/home');
  }

  return (
    <section>
      <Setup />
    </section>
  );
};

export default SetUpPage;
