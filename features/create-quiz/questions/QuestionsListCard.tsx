// QuestionsListCard.tsx
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListOrderedIcon, TrashIcon } from "lucide-react";
import { useQuizStore } from "@/store/createQuizStore";

interface QuestionsListCardProps {
  onQuestionClick: (index: number) => void;
}

const QuestionsListCard: React.FC<QuestionsListCardProps> = ({ onQuestionClick }) => {
  const questions = useQuizStore((state) => state.questions);
  const removeQuestion = useQuizStore((state) => state.removeQuestion);

  return (
    <CardContent className="space-y-4 w-full">
      <div className="grid gap-2">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-muted p-2 rounded-md cursor-pointer"
            onClick={() => onQuestionClick(index)}
          >
            <div className="flex items-center gap-2">
              <ListOrderedIcon className="w-4 h-4 text-muted-foreground" />
              <span>{`Question ${index + 1}: ${question.question}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation();
                removeQuestion(index);
              }}>
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
};

export default QuestionsListCard;
