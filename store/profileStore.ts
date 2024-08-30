import { create } from "zustand";
import { Database } from "@/types/supabase (1)";
import { createClient } from "@/utils/supabase/server";

type ProfileType = Database["public"]["Tables"]["Profiles"]["Row"];

type StateType = {
  Profile: ProfileType | null;
  setProfile: (payload: ProfileType) => void;
  fetchUserProfile: (userId: string) => Promise<void>;
};

const useProfileStore = create<StateType>((set) => ({
  Profile: null,
  setProfile: (payload) => set({ Profile: payload }),
  fetchUserProfile: async (userId) => {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("Profiles")
          .select("*")
          .eq("user_id", userId)
          .single();
    
          if (error) {
            console.log(error);
          }
        if (data) {
          set({ Profile: data });
        }
      },
}));

export { useProfileStore };
