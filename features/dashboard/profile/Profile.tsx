"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfile from "./EditProfile";
import { Profiles } from "@/types/custom";
import { supabase } from "@/lib/supabase";

const Profile = ({ profiles }: { profiles: Profiles }) => {
  // プロフィール情報の状態管理
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profiles>(profiles);

  // プロフィール情報のフェッチ関数
  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("Profiles")
      .select("*")
      .eq("user_id", profiles.user_id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setProfile(data);
    }
  };

  // ダイアログが閉じられたときにプロフィール情報を再フェッチ
  useEffect(() => {
    if (!open) {
      fetchProfile();
    }
  }, [open]);

  // プロフィール画像のパス修正
  const profile_picture = profile.profile_picture
    ? `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/profile/${profile.profile_picture}`
    : `https://udzrjscfqeecytpkwpgp.supabase.co/storage/v1/object/public/${profile.profile_picture}`;

  const avatarFallback = profile.username
    ? profile.username.charAt(0).toUpperCase()
    : "Y";

  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile_picture} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-medium">{profile.username}</div>
              <div className="text-sm text-muted-foreground">
                {profile.account_name}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Introduce</div>
            <div className="text-sm text-muted-foreground">
              {profile.introduce}
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="bg-main text-white rounded-lg py-2 w-40 mx-auto">
                Edit Profile
              </button>
            </DialogTrigger>
            <DialogContent className="w-10/12 rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile information here.
                </DialogDescription>
              </DialogHeader>
              <EditProfile profiles={profile} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
