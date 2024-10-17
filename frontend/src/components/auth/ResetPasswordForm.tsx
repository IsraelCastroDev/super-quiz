import { useResetPassword } from "@/hooks";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useAppStore } from "@/store";
import { useForm } from "react-hook-form";
import { UserResetPasswordData } from "@/types";
import { Form, InputField, ButtonSubmit } from "@/components/ui/Form";

export function ResetPasswordForm() {
  const { mutate, isPending } = useResetPassword();
  const tokenResetPassword = useAppStore((state) => state.tokenResetPassword);
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm<UserResetPasswordData>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (formData: UserResetPasswordData) => {
    mutate({
      password: formData.password,
      confirm_password: formData.confirm_password,
      token: tokenResetPassword ? tokenResetPassword : "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full px-10 py-5 border border-slate-700 shadow-md rounded-md space-y-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="password"
            label="Nueva contraseña:"
            type="password"
            placeholder="*********"
            register={register("password", {
              required: { value: true, message: "La contraseña es requerida" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
              },
            })}
            error={errors.password}
            IconComponent={showPassword ? EyeIcon : EyeSlashIcon}
            onIconClick={() => setShowPassword(!showPassword)}
          />

          <InputField
            id="confirm_password"
            label="Confirmar nueva contraseña:"
            type="password"
            placeholder="*********"
            register={register("confirm_password", {
              required: { value: true, message: "La contraseña es requerida" },
              validate: (value) =>
                value === getValues("password") ||
                "Las contraseñas no coinciden",
            })}
            error={errors.confirm_password}
          />

          <ButtonSubmit isPending={isPending}>Cambiar contraseña</ButtonSubmit>
        </Form>
      </div>
    </div>
  );
}
