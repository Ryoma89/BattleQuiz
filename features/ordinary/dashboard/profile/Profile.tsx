import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfile from "./EditProfile";

const Profile = () => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-medium">John Doe</div>
              <div className="text-sm text-muted-foreground">@johndoe</div>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Introduce</div>
            <div className="text-sm text-muted-foreground">
              I'm a software engineer and I love to code!
            </div>
          </div>
          <Dialog>
            <DialogTrigger className="bg-main text-white rounded-lg py-2 w-40 mx-auto">
              Edit Profile
            </DialogTrigger>
            <DialogContent className="w-10/12 rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile information here.
                </DialogDescription>
              </DialogHeader>
              <EditProfile />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
