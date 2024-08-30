"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuizStore } from "@/store/createQuizStore";
import { fourAnswersSchema, twoAnswersSchema, typeAnswerSchema } from "@/lib/schemas/quizSchema";


const getSchemaByQuestionType = (questionType: "4 answers" | "2 answers" | "Type answer") => {
  switch (questionType) {
    case "4 answers":
      return fourAnswersSchema;
    case "2 answers":
      return twoAnswersSchema;
    case "Type answer":
      return typeAnswerSchema;
    default:
      return fourAnswersSchema;
  }
};

type FormSchemaType = z.infer<typeof fourAnswersSchema>;

interface QuizContentProps {
  quizData: { title: string; category: string[] };
}

const QuizContent: React.FC<QuizContentProps> = ({ quizData }) => {
  const questionToEdit = useQuizStore((state) => state.questionToEdit);
  const questionToEditIndex = useQuizStore((state) => state.questionToEditIndex);
  const addQuestion = useQuizStore((state) => state.addQuestion);
  const updateQuestion = useQuizStore((state) => state.updateQuestion);
  const clearQuestionToEdit = useQuizStore((state) => state.clearQuestionToEdit);
  const [questionType, setQuestionType] = useState<"4 answers" | "2 answers" | "Type answer">("4 answers");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchemaByQuestionType(questionType)),
    defaultValues: {
      question: "",
      questionType: "4 answers",
      timeLimit: 30,
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: [],
    },
  });

  useEffect(() => {
    if (questionToEdit) {
      form.reset(questionToEdit as FormSchemaType);
      setQuestionType(questionToEdit.questionType as "4 answers" | "2 answers" | "Type answer");
    }
  }, [questionToEdit, form]);

  useEffect(() => {
    form.reset({ ...form.getValues(), questionType } as FormSchemaType);
  }, [questionType]);

  const onSubmit = (values: FormSchemaType) => {
    if (questionToEditIndex !== null) {
      updateQuestion(questionToEditIndex, values);
      clearQuestionToEdit();
    } else {
      addQuestion(values);
    }
    form.reset({
      question: "",
      questionType: "4 answers",
      timeLimit: 5,
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctAnswer: [],
    });
    setQuestionType("4 answers");
  };

  const renderAnswers = () => {
    switch (questionType) {
      case "4 answers":
        return (
          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
            <FormField control={form.control} name="answer1" render={({ field }) => (
              <FormItem>
                <FormLabel>Answer 1</FormLabel>
                <div className="flex gap-2 items-center">
                  <Controller name="correctAnswer" control={form.control} render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes("answer1")}
                      onCheckedChange={(checked) => {
                        let newValue: string[];
                        if (checked) {
                          newValue = [...field.value, "answer1"];
                        } else {
                          newValue = field.value.filter((v: string) => v !== "answer1");
                        }
                        field.onChange(newValue);
                      }}
                    />
                  )}/>
                  <FormControl>
                    <Input placeholder="Answer 1" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="answer2" render={({ field }) => (
              <FormItem>
                <FormLabel>Answer 2</FormLabel>
                <div className="flex gap-2 items-center">
                  <Controller name="correctAnswer" control={form.control} render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes("answer2")}
                      onCheckedChange={(checked) => {
                        let newValue: string[];
                        if (checked) {
                          newValue = [...field.value, "answer2"];
                        } else {
                          newValue = field.value.filter((v: string) => v !== "answer2");
                        }
                        field.onChange(newValue);
                      }}
                    />
                  )}/>
                  <FormControl>
                    <Input placeholder="Answer 2" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="answer3" render={({ field }) => (
              <FormItem>
                <FormLabel>Answer 3</FormLabel>
                <div className="flex gap-2 items-center">
                  <Controller name="correctAnswer" control={form.control} render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes("answer3")}
                      onCheckedChange={(checked) => {
                        let newValue: string[];
                        if (checked) {
                          newValue = [...field.value, "answer3"];
                        } else {
                          newValue = field.value.filter((v: string) => v !== "answer3");
                        }
                        field.onChange(newValue);
                      }}
                    />
                  )}/>
                  <FormControl>
                    <Input placeholder="Answer 3" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="answer4" render={({ field }) => (
              <FormItem>
                <FormLabel>Answer 4</FormLabel>
                <div className="flex gap-2 items-center">
                  <Controller name="correctAnswer" control={form.control} render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes("answer4")}
                      onCheckedChange={(checked) => {
                        let newValue: string[];
                        if (checked) {
                          newValue = [...field.value, "answer4"];
                        } else {
                          newValue = field.value.filter((v: string) => v !== "answer4");
                        }
                        field.onChange(newValue);
                      }}
                    />
                  )}/>
                  <FormControl>
                    <Input placeholder="Answer 4" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>
          </div>
        );
      case "2 answers":
        return (
          <>
            <h2>True or False</h2>
            <div className="flex gap-2 items-center">
              <FormField control={form.control} name="correctAnswer" render={({ field }) => (
                <FormItem className="flex items-end">
                  <Controller name="correctAnswer" control={form.control} render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes("True")}
                      onCheckedChange={(checked) => {
                        let newValue: string[];
                        if (checked) {
                          newValue = ["True"];
                        } else {
                          newValue = [];
                        }
                        field.onChange(newValue);
                      }}
                    />
                  )}/>
                  <Label className="ml-2">True</Label>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="correctAnswer" render={({ field }) => (
                <FormItem className="flex items-end">
                  <Controller name="correctAnswer" control={form.control} render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes("False")}
                      onCheckedChange={(checked) => {
                        let newValue: string[];
                        if (checked) {
                          newValue = ["False"];
                        } else {
                          newValue = [];
                        }
                        field.onChange(newValue);
                      }}
                    />
                  )}/>
                  <FormLabel className="ml-2">False</FormLabel>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>
          </>
        );
  
      case "Type answer":
        return (
          <FormField control={form.control} name="answer1" render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Type answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        );
      default:
        return null;
    }
  };
  

  const timeLimits = Array.from({ length: 10 }, (_, i) => (i + 1) * 30);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Question {questionToEditIndex !== null ? questionToEditIndex + 1 : useQuizStore.getState().questions.length + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="question" render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter question title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="questionType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value as "4 answers" | "2 answers" | "Type answer");
                        setQuestionType(value as "4 answers" | "2 answers" | "Type answer");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4 answers">4 answers</SelectItem>
                        <SelectItem value="2 answers">2 answers</SelectItem>
                        <SelectItem value="Type answer">Type answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="timeLimit" render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Time Limit</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question time limit" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeLimits.map((limit) => (
                        <SelectItem key={limit} value={limit.toString()}>
                          {limit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
              {renderAnswers()}
              <div className="flex gap-2 justify-end w-full">
                <Button variant="outline" className="w-16">Delete</Button>
                <Button type="submit" className="w-16">{questionToEditIndex !== null ? "Update" : "Add"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizContent;
