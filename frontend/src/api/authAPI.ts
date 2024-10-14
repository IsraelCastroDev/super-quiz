import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import { UserFormData, UserLoginData } from "@/types";

export const registerUser = async (formData: UserFormData) => {
  try {
    const { data } = await api.post("/users/create-account", {
      ...formData,
    });

    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const loginUser = async (formData: UserLoginData) => {
  try {
    const { data } = await api.post("/users/login", {
      ...formData,
    });

    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
