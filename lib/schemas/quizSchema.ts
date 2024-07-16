import { z } from "zod";

const baseSchema = {
  question: z.string().min(1, "Question is required"),
  questionType: z.enum(["4 answers", "2 answers", "Type answer"]),
  timeLimit: z
    .number()
    .min(5)
    .max(60, "Time limit must be between 5 and 60 seconds"),
  correctAnswer: z.array(z.string()),
};

export const fourAnswersSchema = z.object({
  ...baseSchema,
  answer1: z.string().min(1, "Answer cannot be empty"),
  answer2: z.string().min(1, "Answer cannot be empty"),
  answer3: z.string().optional(),
  answer4: z.string().optional(),
});

export const twoAnswersSchema = z.object({
  ...baseSchema,
  answer1: z.string().optional(),
  answer2: z.string().optional(),
  answer3: z.string().optional(),
  answer4: z.string().optional(),
});

export const typeAnswerSchema = z.object({
  ...baseSchema,
  answer1: z.string().min(1, "Answer cannot be empty"),
  answer2: z.string().optional(),
  answer3: z.string().optional(),
  answer4: z.string().optional(),
});
