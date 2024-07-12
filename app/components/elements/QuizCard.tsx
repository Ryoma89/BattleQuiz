import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleHelp } from "lucide-react";
import React from "react";

const QuizCard = () => {
  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">Acme Inc</div>
          </div>
          <h3 className="text-xl font-bold">History of the World</h3>
          <p className="text-muted-foreground line-clamp-2">
            Test your knowledge of world history with this engaging quiz.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">20 questions</Badge>
            <Badge variant="outline">New</Badge>
          </div>
          
          <Button className="bg-purple-500 w-full">Take Quiz</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default QuizCard;
