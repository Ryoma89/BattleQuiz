import { Provider } from "@supabase/supabase-js";

export type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};