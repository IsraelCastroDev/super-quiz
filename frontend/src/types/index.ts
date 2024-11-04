import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string(),
});

export type UserFormData = z.infer<typeof UserSchema>;
export type UserLoginData = Pick<UserFormData, "email" | "password">;
export type UserResetPasswordData = Pick<
  UserFormData,
  "password" | "confirm_password"
> & { token: string };
export type UserAuthData = Pick<UserFormData, "name" | "lastname" | "username">;
export type UserProfileData = Omit<
  UserFormData,
  "password" | "confirm_password"
> & {
  created_at: string;
};

export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const CategorySelectedFormSchema = z.object({
  name: z.string(),
  selected: z.boolean(),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategorySelectedForm = z.infer<typeof CategorySelectedFormSchema>;

export const AnswerFormDataSchema = z.object({
  title: z.string(),
  is_correct: z.boolean(),
});

export const QuestionFormDataSchema = z.object({
  title: z.string(),
  answers: z.array(AnswerFormDataSchema),
});

export const CategoryFormDataSchema = z.object({
  title: z.string(),
});

export const CreateQuizFormDataSchmea = z.object({
  title: z.string(),
  categories: z.array(CategoryFormDataSchema),
  duration: z.number(),
  questions: z.array(QuestionFormDataSchema),
});

export type CreateQuiz = z.infer<typeof CreateQuizFormDataSchmea>;
