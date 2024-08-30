import { signOut } from "@/app/(login)/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import SheetWrapper from "../elements/SheetWrapper";

const QuizHeader = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // プロフィール情報を取得
  const { data: profile, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return;
  }

  const profile_picture = profile.profile_picture
    ? `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/profile/${profile.profile_picture}`
    : `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/${profile.profile_picture}`;

  const username = profile?.username || "User";

  return (
    <div>
      <header className="z-10 top-0 w-full bg-white border-b-2 fixed py-1">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={56}
                priority
                style={{ width: "auto", height: "auto" }}
              ></Image>
            </a>
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="flex items-center gap-2 mr-1 space-x-2">
              <p className="">Mr.{username}</p>
              <Link href="/dashboard">
                <Avatar>
                  <AvatarImage src={profile_picture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <form
                className="flex items-center gap-2"
              >
                <Button className="bg-red-600 hover:bg-red-400">Exit Quiz</Button>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default QuizHeader;
