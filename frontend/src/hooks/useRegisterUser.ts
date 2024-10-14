import { registerUser } from "@/api/authAPI";
import { useAppStore } from "@/store/useAppStore";
import { UserFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function useRegisterUser() {
  const addNotification = useAppStore((state) => state.addNotification);
  const navigate = useNavigate();

  const mutationRegisterUser = useMutation({
    mutationFn: registerUser,
    onSuccess(data) {
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

  return mutationRegisterUser;
}

export function useValidationRegisterUserForm() {
  const validationRegisterUserForm = useForm<UserFormData>({
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  return validationRegisterUserForm;
}
