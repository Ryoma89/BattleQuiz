import { supabase } from "@/lib/supabase";
import { CardUser } from "@/types/User";

export const fetchUserData = async (userId: string): Promise<CardUser | null> => {
  const { data: user, error: userError } = await supabase
    .from("Profiles")
    .select("username, profile_picture")
    .eq("user_id", userId)
    .single();

  if (userError) {
    console.error(`Error fetching user data for user ${userId}:`, userError);
    return null;
  }

  return user;
};
