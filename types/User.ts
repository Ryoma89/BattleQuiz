export interface User {
  user_id: string;
  username: string | null;
  email: string;
  created_at: string | null;
  profile_picture: string | null;
  is_first_login: boolean | null;
  account_name: string | null;
  introduce: string | null;
}

export type CardUser = {
  user_id: string;
  username: string;
  profile_picture: string;
};
