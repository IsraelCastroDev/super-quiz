import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import {
  QuizCategoryAPIResponseSchema,
  QuizSearchSchema,
  UserQuiz,
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

export const deleteQuiz = async (idQuiz: UserQuiz["_id"]) => {
  try {
    const { data } = await api.delete(`/quizzes/${idQuiz}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const getQuizByToken = async (quizCode: string | undefined) => {
  try {
    if (quizCode) {
      const { data } = await api.get(`/quizzes/get-quiz-by-token/${quizCode}`);
      const validateData = QuizSearchSchema.safeParse(data);

      if (validateData.success) {
        return data;
      }
    }
    throw new Error("Ocurrió un error al enviar el código");
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
