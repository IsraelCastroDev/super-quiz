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
