import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import {
  QuizCategoryAPIResponseSchema,
  UserQuizzesAPIResponseSchema,
} from "@/schemas";
import { CreateQuiz } from "@/types";

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

export const createQuiz = async (formData: CreateQuiz) => {
  try {
    const { data } = await api.post("/quizzes/create-quiz", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const getQuizFromUser = async () => {
  try {
    const { data } = await api.get("/quizzes/get-quizzes-from-user");
    const validateData = UserQuizzesAPIResponseSchema.safeParse(data);

    if (validateData.success) {
      return validateData.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
