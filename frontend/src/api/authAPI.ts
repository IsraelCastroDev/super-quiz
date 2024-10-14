import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import { UserFormData } from "../types";

export const registerUser = async (formData: UserFormData) => {
  try {
    await api.post("/users/create-account", {
      ...formData,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
