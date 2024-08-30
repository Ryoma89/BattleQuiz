import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SetupForm from "./SetupForm";
import { User } from '@/types/User';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const Setup = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const plainUser: User = {
    user_id: user.id,
    username: user.user_metadata?.full_name || '',
    email: user.email || null,
    profile_picture: user.user_metadata?.avatar_url || '/default.png',
    created_at: user.created_at,
    account_name: user.user_metadata?.account_name || '',
    introduce: user.user_metadata?.introduce || '',
    is_first_login: user.user_metadata?.is_first_login || false, // ここでプロパティを追加
  }

  return (
    <div className="pt-10">
      <Card className="w-4/5 mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Set up your profile</CardTitle>
          <CardDescription className="text-center">Complete your profile setup to personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <SetupForm user={plainUser} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;
