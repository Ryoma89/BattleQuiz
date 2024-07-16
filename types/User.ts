export interface User {
  user_id: string;
  username: string | null;
  email: string | null;
  created_at: string | null;
  profile_picture: string | null;
  is_first_login: boolean | null; // このプロパティを追加
  account_name: string | null;
  introduce: string | null;
}