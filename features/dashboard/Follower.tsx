import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Follower = () => {
  return (
    <Card className="col-span-1">
      <CardHeader className="">
        <CardTitle>Followed Users</CardTitle>
        <CardDescription>
          View the users you're currently following.
        </CardDescription>
      </CardHeader >
      <CardContent className="">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">@johndoe</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Jane Appleseed</div>
              <div className="text-xs text-muted-foreground">
                @janeappleseed
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Sarah Miller</div>
              <div className="text-xs text-muted-foreground">@sarahmiller</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Follower;
