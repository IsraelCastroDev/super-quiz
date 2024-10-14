import { loginUser } from "@/api/authAPI";
import { useAppStore } from "@/store/useAppStore";
import { UserLoginData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function useLoginUser() {
  const addNotification = useAppStore((state) => state.addNotification);
  const navigate = useNavigate();

  const mutatationUserLogin = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      addNotification({
        title: data,
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

export function useValidationLoginUserForm() {
  const validationLoginUserForm = useForm<UserLoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return validationLoginUserForm;
}
