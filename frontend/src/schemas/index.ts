import { z } from "zod";

export const QuizCategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const QuizCategoryAPIResponseSchema = z.array(QuizCategorySchema);

export const UserProfileAPIResponseSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string(),
  created_at: z.string(),
});
