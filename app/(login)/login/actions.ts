"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helper";

export async function emailLogin(formData: FormData) {
  const supabase = await createClient();

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

// リダイレクト先がhomeにいかない
export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const email = formData.get("email");
  const password = formData.get("password");

  // Ensure email and password are not undefined
  if (!email || !password) {
    return redirect("/signup?message=Email and password are required");
  }

  const data = {
    email: email as string,
    password: password as string,
  };

  const redirectUrl = getURL("/home");

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });

  if (error) {
    console.log(error);
    redirect("/login?message=Error signing up");
  }

  const user = signUpData.user;

  if (user) {
    const profileData = {
      user_id: user.id,
      email: user.email ?? '', // Ensure this matches the expected type (string | null)
      // Add other fields as required by your "Profiles" table schema
    };

    const { data: insertData, error: insertError } = await supabase
      .from("Profiles")
      .insert([profileData]);

    if (insertError) {
      console.log('Error inserting user profile:', insertError);
      return redirect('/login?message=Error inserting user profile');
    }
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }

  const supabase = await createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect("/login?message=Could not authenticate user");
  }

  return redirect(data.url);
}
