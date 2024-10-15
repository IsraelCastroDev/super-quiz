import { UserLoginData } from "@/types";
import { Link } from "react-router-dom";
import ErrorMessage from "../ui/ErrorMessage";
import { useValidationLoginUserForm } from "@/hooks/useAuthUser";
import ButtonSubmit from "../ui/ButtonSubmit";

interface Props {
  onSubmit: (data: UserLoginData) => void;
  isPending: boolean;
}

function LoginForm({ onSubmit, isPending }: Props) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useValidationLoginUserForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
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
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Contraseña:</label>
        <input
          type="password"
          id="password"
          placeholder="***************"
          className="p-2 border border-slate-700 shadow-sm rounded-md"
          {...register("password", {
            required: { value: true, message: "La contraseña es requerida" },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <ButtonSubmit isPending={isPending} messageLoading="Iniciando sesión...">
        Iniciar sesión
      </ButtonSubmit>

      <div className="flex items-center justify-between">
        <Link to={"/recuperar-cuenta"}>¿Olvidaste tu contraseña?</Link>

        <Link to={"/registrarse"}>¿No tienes una cuenta?</Link>
      </div>
    </form>
  );
}
export default LoginForm;
