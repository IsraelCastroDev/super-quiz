import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import { UserFormData, UserLoginData, UserResetPasswordData } from "@/types";

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

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

type Error = {
  error: string;
};

export const logoutUser = async () => {
  try {
    const { data } = await api.post("/users/logout");

    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};

export const recoverPassword = async (email: UserLoginData["email"]) => {
  try {
    const { data } = await api.post(
      "/users/request-token-to-recover-password",
      {
        email,
      }
    );

    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data) {
        throw new Error(error.response?.data.message);
      } else {
        error.response?.data.errors.forEach((error: Error) => {
          throw new Error(error.error);
        });
      }
    }
  }
};

export const confirmAccount = async (token: string) => {
  try {
    const { data } = await api.post("/users/confirm-account", { token });
    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data) {
        throw new Error(error.response?.data.message);
      } else {
        error.response?.data.errors.forEach((error: Error) => {
          throw new Error(error.error);
        });
      }
    }
  }
};

export const validateToken = async (token: string) => {
  try {
    const { data } = await api.post("/users/validate-token", {
      token,
    });

    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data) {
        throw new Error(error.response?.data.message);
      } else {
        error.response?.data.errors.forEach((error: Error) => {
          throw new Error(error.error);
        });
      }
    }
  }
};

export const resetPassword = async (formData: UserResetPasswordData) => {
  try {
    const { data } = await api.post("/users/reset-password", {
      ...formData,
    });

    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data) {
        console.log(error.response?.data);
        throw new Error(error.response?.data.message);
      } else {
        console.log(error.response?.data);
        error.response?.data.errors.forEach((error: Error) => {
          throw new Error(error.error);
        });
      }
    }
  }
};

export const validateAuth = async () => {
  try {
    const { data } = await api.get("/users/auth/me");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
