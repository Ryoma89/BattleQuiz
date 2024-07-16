// QuestionsList.tsx
"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuestionsListCard from "./QuestionsListCard";
import { useQuizStore } from "@/store/createQuizStore";

const QuestionsList = () => {
  const [open, setOpen] = useState(false);
  const title = useQuizStore((state) => state.title);
  const category = useQuizStore((state) => state.category);
  const setQuestionToEdit = useQuizStore((state) => state.setQuestionToEdit);

  const handleQuestionClick = (index: number) => {
    setQuestionToEdit(index);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>Title: {title}</CardTitle>
            <CardDescription>Category: {category.join(", ")}</CardDescription>
          </CardHeader>
          <QuestionsListCard onQuestionClick={handleQuestionClick} />
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full md:hidden bg-pur text-white rounded-lg py-2">
            Questions
          </Button>
        </DialogTrigger>
        <DialogContent className="w-10/12 rounded-lg">
          <DialogHeader>
            <DialogTitle>Title: {title}</DialogTitle>
            <DialogDescription>
              Category: {category.join(", ")}
            </DialogDescription>
          </DialogHeader>
          <QuestionsListCard onQuestionClick={handleQuestionClick} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionsList;
