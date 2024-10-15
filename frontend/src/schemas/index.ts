import { z } from "zod";

export const QuizCategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const QuizCategoryAPIResponseSchema = z.array(QuizCategorySchema);
