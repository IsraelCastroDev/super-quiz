import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import {
  AnswesResponseSchema,
  CheckQuizExistsSchema,
  QuizCategoryAPIResponseSchema,
  QuizCategorySchema,
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

export const getCategorieById = async (categorieId: string) => {
  try {
    const { data } = await api.get(`/quizzes/categorie/${categorieId}`);
    const validateData = QuizCategorySchema.safeParse(data);

    if (validateData.success) {
      return validateData.data;
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

export const checkQuizExists = async (token: string | undefined) => {
  try {
    if (token) {
      const { data } = await api.get(`/quizzes/check-quiz-exists/${token}`);
      const validateData = CheckQuizExistsSchema.safeParse(data);

      if (validateData.success) {
        return validateData.data;
      }
    } else {
      throw new Error("El token es undefined");
    }
  } catch (error) {
    console.log("error ---------> ", error);
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

export const getQuizById = async (quizId: string | undefined) => {
  try {
    if (quizId) {
      const { data } = await api.get(`/quizzes/get-quiz-by-id/${quizId}`);
      const validateData = QuizSearchSchema.safeParse(data);

      if (validateData.success) {
        return validateData.data;
      }
    }
    throw new Error("Ocurrió un error al enviar el código");
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const getAnswers = async (questionId: string) => {
  try {
    const { data } = await api.get(`/quizzes/questions/${questionId}/answers`);
    const validateData = AnswesResponseSchema.safeParse(data);

    if (validateData.success) {
      return validateData.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
