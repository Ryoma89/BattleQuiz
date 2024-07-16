import { Separator } from "@/components/ui/separator";
import Dashboard from "@/features/dashboard/Dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const {data: profiles, error} = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

    if(error) {
      console.log(error);
      return (
        <section>
          <p>Something went wrong</p>
        </section>
      )
    }
  return (
    <section>
      <Dashboard profiles={profiles}/>
      <Separator />
    </section>
  );
};

export default DashboardPage;
