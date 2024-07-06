import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
    <header className="z-10 sticky top-0 w-full bg-white border-b-2">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Image src="/logo.png" alt="logo" width={100} height={56}></Image>
          </a>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
        {user !== null ? (
            <form action={signOut} className="flex items-center gap-2">
              <p>{user.email}</p>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
