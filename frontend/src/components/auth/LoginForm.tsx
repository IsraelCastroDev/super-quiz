import { UserLoginData } from "@/types";
import { Link } from "react-router-dom";
import { useValidationLoginUserForm } from "@/hooks";
import { Form, InputField, ButtonSubmit } from "@/components/ui/Form";

interface Props {
  onSubmit: (data: UserLoginData) => void;
  isPending: boolean;
}

export function LoginForm({ onSubmit, isPending }: Props) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useValidationLoginUserForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="email"
        label="Correo electrónico:"
        type="email"
        placeholder="Por ej. ejemplo@correo.com"
        register={register("email", {
          required: { value: true, message: "El correo es requerido" },
        })}
        error={errors.email}
      />

      <InputField
        id="password"
        type="password"
        label="Contraseña:"
        placeholder="*********"
        register={register("password", {
          required: { value: true, message: "La contraseña es requerida" },
        })}
        error={errors.password}
      />

      <ButtonSubmit isPending={isPending} messageLoading="Iniciando sesión...">
        Iniciar sesión
      </ButtonSubmit>

      <div className="flex items-center justify-between gap-x-2">
        <Link to={"/recuperar-cuenta"} className="hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

        <Link to={"/registrarse"} className="hover:underline">
          ¿No tienes una cuenta?
        </Link>
      </div>
    </Form>
  );
}
