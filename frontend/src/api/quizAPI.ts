import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import { QuizCategoryAPIResponseSchema } from "@/schemas";

export const getQuizCategories = async () => {
  try {
    const { data } = await api.get("/quizzes/categories");
    const validateData = QuizCategoryAPIResponseSchema.safeParse(data);

    if (validateData.success) {
      return validateData.data;
    } else {
      throw new Error(validateData.error.message);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
