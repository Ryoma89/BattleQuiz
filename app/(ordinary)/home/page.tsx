import HomePageClient from '@/features/home/HomePageClient';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Homepage = async () => {
  const supabase = await createClient();

  // ログインしているか確認
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // プロフィール情報を取得(is_first_loginのみを取得)
  const { data: profile, error } = await supabase
    .from('Profiles')
    .select('is_first_login')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return;
  }

  if (profile && profile.is_first_login) {
    return redirect('/setup-profile');
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
    <section>
      <HomePageClient profileInfo={profileInfo} />
    </section>
  );
};

export default Homepage;
