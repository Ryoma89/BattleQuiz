// import { Database } from "@/types/supabase (1)";
// import { createClient } from "@/utils/supabase/server";
// import { create } from "zustand";

// type ProfileType = Database["public"]["Tables"]["Profiles"]["Row"];

// type StateType = {
//   Profile: ProfileType;
//   setProfile: (payload: ProfileType) => void;
//   fetchUserProfile: (userId: string) => Promise<void>;
// };

// const useProfileStore = create<StateType>((set) => ({
//   // プロフィールデータ
//   Profile: {
//     user_id: "",
//     username: "",
//     email: null,
//     created_at: "",
//     profile_picture: "",
//     is_first_login: true,
//     account_name: "",
//     introduce: "",
//   },
//   // プロフィールデータを更新する関数
//   setProfile: (payload) => set({ Profile: payload }),
//   // supabaseからユーザープロフィールを取得する関数
//   fetchUserProfile: async (userId) => {
//     const supabase = await createClient();
//     const { data, error } = await supabase
//       .from("Profiles")
//       .select("*")
//       .eq("user_id", userId)
//       .single();

//       if (error) {
//         console.log(error);
//       }
//     if (data) {
//       set({ Profile: data });
//     }
//   },
// }))

// export {useProfileStore};

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
  // プロフィールデータの初期値を null に設定
  Profile: null,
  // プロフィールデータを更新する関数
  setProfile: (payload) => set({ Profile: payload }),
  // supabaseからユーザープロフィールを取得する関数
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
