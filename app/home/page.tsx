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
  return (
    <div>
      home
    </div>
  )
}

export default Homepage
