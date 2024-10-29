import { z } from "zod";

export const QuizCategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
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

export const UserQuizSchema = z.object({
  _id: z.string(),
  title: z.string(),
  score: z.number(),
  categories: z.array(
    z.object({
      category: z.object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    })
  ),
  questions: z.array(
    z.object({
      id: z.string(),
    })
  ),
});

export const QuestionSchema = z.object({
  _id: z.string(),
  __v: z.number(),
  title: z.string(),
  quiz: z.string(),
  answers: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const QuizSearchSchema = z.object({
  _id: z.string(),
  __v: z.number(),
  title: z.string(),
  user: z.string(),
  score: z.number(),
  token: z.string(),
  questions: z.array(QuestionSchema),
});

export const UserQuizzesAPIResponseSchema = z.array(UserQuizSchema);

export type UserQuizzes = z.infer<typeof UserQuizzesAPIResponseSchema>;
export type UserQuiz = z.infer<typeof UserQuizSchema>;
