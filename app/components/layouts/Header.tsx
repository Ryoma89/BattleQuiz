import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBar from "./SideBar";
import { redirect } from "next/navigation";

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) {
    return redirect('/login');
  }

  // プロフィール情報を取得
  const { data: profile, error } = await supabase
    .from('Profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    const profile_picture = profile?.profile_picture 
    ? `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/${profile.profile_picture}` 
    : 'https://github.com/shadcn.png';
    const username = profile?.username || 'User';
  console.log(profile_picture);

  return (
    <div>
      <header className="z-10 sticky top-0 w-full bg-white border-b-2">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Image src="/logo.png" alt="logo" width={100} height={56}></Image>
            </a>
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-2">
            {user !== null ? (
              <div className="flex items-center gap-2 mr-1 space-x-2">
                {/* <p className="hidden lg:flex">{user.email}</p> */}
                <p className="hidden lg:flex">Mr.{username}</p>
                <Link href="/dashboard">
                  <Avatar>
                    <AvatarImage src={profile_picture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <form
                  action={signOut}
                  className="md:flex items-center gap-2 hidden"
                >
                  <Button>Sign Out</Button>
                </form>
              </div>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <SideBar />
                <form
                  action={signOut}
                  className="md:flex items-center gap-2 hidden"
                >
                  <Button>Sign Out</Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
