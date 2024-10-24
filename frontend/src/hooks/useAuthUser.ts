import {
  confirmAccount,
  loginUser,
  logoutUser,
  recoverPassword,
  resetPassword,
  validateAuth,
  validateToken,
} from "@/api/authAPI";
import { deleteQuiz } from "@/api/quizAPI";
import { useAppPersists, useAppStore } from "@/store";
import { UserLoginData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function useLoginUser() {
  const addNotification = useAppStore((state) => state.addNotification);
  const setUserAuth = useAppPersists((state) => state.setUserAuth);
  const navigate = useNavigate();

  const mutatationUserLogin = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUserAuth(data.user);
      addNotification({
        title: data.message,
        type: "success",
      });
      navigate("/");
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
    },
  });

  return mutatationUserLogin;
}

export function useLogoutUser() {
  const addNotification = useAppStore((state) => state.addNotification);
  const clearUserAuth = useAppPersists((state) => state.clearUserAuth);

  const mutatationUserLogout = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      clearUserAuth();
      addNotification({ title: data, type: "success" });
    },
    onError: (error) => {
      addNotification({ title: error.message, type: "error" });
    },
  });

  return mutatationUserLogout;
}

export function useValidationLoginUserForm() {
  const validationLoginUserForm = useForm<UserLoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return validationLoginUserForm;
}

export function useRecoverPassword() {
  const addNotification = useAppStore((state) => state.addNotification);

  const mutationRecoverPassword = useMutation({
    mutationFn: recoverPassword,
    onSuccess: (data) => {
      addNotification({
        title: data,
        type: "success",
      });
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
    },
  });

  return mutationRecoverPassword;
}

export function useValidateToken() {
  const addNotification = useAppStore((state) => state.addNotification);
  const setShowTokenPinForm = useAppStore((state) => state.setShowTokenPinForm);

  const mutationValidateToken = useMutation({
    mutationFn: validateToken,
    onSuccess: (data) => {
      addNotification({
        title: data,
        type: "success",
      });
      setShowTokenPinForm(true);
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
    },
  });

  return mutationValidateToken;
}

export function useResetPassword() {
  const addNotification = useAppStore((state) => state.addNotification);

  const mutationResetPassword = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      addNotification({
        title: data,
        type: "success",
      });
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
    },
  });

  return mutationResetPassword;
}

export function useConfirmAccount() {
  const addNotification = useAppStore((state) => state.addNotification);

  const mutationConfirmAccount = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      addNotification({ title: data, type: "success" });
    },
    onError: (error) => {
      addNotification({ title: error.message, type: "error" });
    },
  });

  return mutationConfirmAccount;
}

export function useValidateAuth() {
  const queryValidateAuth = useQuery({
    queryKey: ["auth"],
    queryFn: validateAuth,
    retry: false,
  });

  return queryValidateAuth;
}

export function useDeleteQuiz() {
  const addNotification = useAppStore((state) => state.addNotification);
  const queryClient = useQueryClient();
  // Para rastrear el quiz que se está eliminando
  const [deletingQuizId, setDeletingQuizId] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: (data) => {
      addNotification({
        title: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user-quizzes"] });
      setDeletingQuizId(null); // Resetear el ID del quiz que se estaba eliminando
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
      setDeletingQuizId(null); // Resetear el ID del quiz en caso de error
    },
  });

  return { deletingQuizId, setDeletingQuizId, mutate, isPending };
}
