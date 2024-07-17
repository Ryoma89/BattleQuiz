import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/home';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { user } = data;
      if (user) {
        // ユーザーが既に存在するか確認
        const { data: existingUser, error: fetchError } = await supabase
          .from('Profiles')
          .select('user_id')
          .eq('user_id', user.id)
          .single();

        if (fetchError) {
          console.log('Error checking existing user:', fetchError);
          return NextResponse.redirect(`${origin}/login?message=Error checking existing user`);
        }

        // ユーザーが存在しない場合のみ挿入
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('Profiles')
            .insert([{ user_id: user.id, email: user.email }]);

          if (insertError) {
            console.log('Error inserting user profile:', insertError);
            return NextResponse.redirect(`${origin}/login?message=Error inserting user profile`);
          }
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?message=Could not login with provider`);
}
