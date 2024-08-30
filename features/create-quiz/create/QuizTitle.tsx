"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categories } from "@/constants/quizCategory";
import { MultiValue } from 'react-select';
import { useQuizStore } from '@/store/createQuizStore';
import { Textarea } from '@/components/ui/textarea';

const Select = dynamic(() => import('react-select'), { ssr: false });

const formSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().max(140).optional(),
  category: z.array(z.string()).nonempty("At least one category is required"),
});

interface CategoryOption {
  value: string;
  label: string;
}

interface QuizTitleProps {
  onSubmit: (data: { title: string; category: string[] }) => void;
}

const QuizTitle: React.FC<QuizTitleProps> = ({ onSubmit }) => {
  const setTitle = useQuizStore((state) => state.setTitle);
  const setDescription = useQuizStore((state) => state.setDescription);
  const setCategory = useQuizStore((state) => state.setCategory);
  const title = useQuizStore((state) => state.title);
  const category = useQuizStore((state) => state.category);
  const description = useQuizStore((state) => state.description);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      category: category,
    },
  });

  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  const handleSubmit = (values: any) => {
    setTitle(values.title);
    setDescription(values.description);
    setCategory(values.category);
    onSubmit(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
          <CardDescription>Fill out the form to create a new quiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter quiz title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter quiz description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Category</FormLabel>
                    <FormControl>
                      <Select
                        instanceId="quiz-category-select"
                        isMulti
                        options={categories}
                        onChange={(selectedOptions) => {
                          const selectedValues = (selectedOptions as MultiValue<CategoryOption>).map(
                            (option) => option.value
                          );
                          field.onChange(selectedValues);
                        }}
                        value={categories.filter((category) =>
                          field.value.includes(category.value)
                        )}
                        menuPortalTarget={menuPortalTarget}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end w-full">
                <Button variant="outline" className="w-16">Delete</Button>
                <Button className="w-16" type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizTitle;
