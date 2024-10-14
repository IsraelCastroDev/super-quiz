import { useForm } from "react-hook-form";
import Text from "../../components/ui/Typography";
import { UserFormData } from "../../types";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/authAPI";
import { useAppStore } from "../../store/useAppStore";
import { useNavigate } from "react-router-dom";

function RegisterPager() {
  const addNotification = useAppStore((state) => state.addNotification);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess(data) {
      addNotification({
        title: data,
        type: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data: UserFormData) => {
    mutate(data);
  };

  return (
    <>
      <section>
        <div className="max-w-[35rem] mx-auto px-10 py-5 border border-slate-700 shadow-md rounded-md mt-5 space-y-3">
          <Text as="h1" category="title" className="text-center">
            Regístrate y crea tus propios Super Quiz 🚀
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                placeholder="Por ej. Luis Gustavo"
                className="p-2 border border-slate-700 shadow-sm rounded-md"
                {...register("name", {
                  required: { value: true, message: "El nombre es requerido" },
                })}
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastname">Apellido:</label>
              <input
                type="text"
                id="lastanme"
                placeholder="Por ej. Martínez"
                className="p-2 border border-slate-700 shadow-sm rounded-md"
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "El apellido es requerido",
                  },
                })}
              />
              {errors.lastname && (
                <ErrorMessage>{errors.lastname.message}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                id="username"
                placeholder="Por ej. luisgustavo11"
                className="p-2 border border-slate-700 shadow-sm rounded-md"
                {...register("username", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es requerido",
                  },
                })}
              />
              {errors.username && (
                <ErrorMessage>{errors.username.message}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                placeholder="Por ej. ejemplo@correo.com"
                className="p-2 border border-slate-700 shadow-sm rounded-md"
                {...register("email", {
                  required: { value: true, message: "El correo es requerido" },
                })}
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Contraseña:</label>
              <div className="flex items-center justify-between p-2 focus:border-2 focus:border-slate-800 border border-slate-700 shadow-sm rounded-md">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="**********"
                  className="w-full outline-none"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida",
                    },
                  })}
                />
                <button type="button" onClick={handleShowPassword}>
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
              <label htmlFor="confirm_password">Confirmar contraseña:</label>
              <div className="flex items-center justify-between p-2 focus:border-2 focus:border-slate-800 border border-slate-700 shadow-sm rounded-md">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm_password"
                  placeholder="Ingresa nuevamente la contraseña"
                  className="w-full outline-none"
                  {...register("confirm_password", {
                    required: {
                      value: true,
                      message: "La confirmación es requerida",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Las contraseñas no coinciden",
                  })}
                />
                <button type="button" onClick={handleShowPassword}>
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-md text-center cursor-pointer block w-full"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
export default RegisterPager;
