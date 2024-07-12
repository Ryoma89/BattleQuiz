import HomePageClient from '@/features/normal/home/HomePageClient';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import React from 'react'

const Homepage = async () => {
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
    return;
  }

  if (profile && profile.is_first_login) {
    return redirect('/setup-profile');
  }
  return (
    <div>
      <HomePageClient />
    </div>
  )
}

export default Homepage
