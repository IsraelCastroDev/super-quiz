import { useResetPassword } from "@/hooks/useLoginUser";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import ButtonSubmit from "../ui/ButtonSubmit";
import { useAppStore } from "@/store/useAppStore";
import { useForm } from "react-hook-form";
import { UserResetPasswordData } from "@/types";
import ErrorMessage from "../ui/ErrorMessage";

function ResetPasswordForm() {
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Nueva contraseña</label>
            <div className="flex items-center p-2 border border-slate-700 shadow-sm rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******************"
                id="password"
                className="w-full outline-none"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseño es requerida",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message:
                      "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password">Confirmar nueva contraseña</label>
            <div className="flex items-center p-2 border border-slate-700 shadow-sm rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******************"
                id="confirm_password"
                className="w-full outline-none"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "La contraseño es requerida",
                  },
                  validate: (value) =>
                    value === getValues("password") ||
                    "Las contraseñas no coinciden",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
            )}
          </div>

          <ButtonSubmit isPending={isPending}>Cambiar contraseña</ButtonSubmit>
        </form>
      </div>
    </div>
  );
}
export default ResetPasswordForm;
