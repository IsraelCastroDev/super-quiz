import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useValidationRegisterUserForm } from "@/hooks/useRegisterUser";
import { UserFormData } from "@/types";
import ButtonSubmit from "../ui/Form/ButtonSubmit";
import InputField from "../ui/Form/InputField";
import Form from "../ui/Form/Form";

interface Props {
  onSubmit: (data: UserFormData) => void;
  isPending: boolean;
}

function RegisterForm({ onSubmit, isPending }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const validationRegisterUserForm = useValidationRegisterUserForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = validationRegisterUserForm;

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="name"
        type="text"
        label="Nombre:"
        placeholder="Por ej. Luis Gustavo"
        register={register("name", {
          required: { value: true, message: "El nombre es requerido" },
        })}
        error={errors.name}
      />

      <InputField
        id="lastname"
        type="text"
        label="Apellido:"
        placeholder="Por ej. Martínez"
        register={register("lastname", {
          required: { value: true, message: "El apellido es requerido" },
        })}
        error={errors.lastname}
      />

      <InputField
        id="username"
        type="text"
        label="Nombre de usuario:"
        placeholder="Por ej. luisgustavo11"
        register={register("username", {
          required: {
            value: true,
            message: "El nombre de usuario es requerido",
          },
        })}
        error={errors.username}
      />

      <InputField
        id="email"
        type="email"
        label="Correo electrónico:"
        placeholder="Por ej. ejemplo@correo.com"
        register={register("email", {
          required: { value: true, message: "El correo es requerido" },
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "El email no es válido",
          },
        })}
        error={errors.email}
      />

      <InputField
        type={showPassword ? "text" : "password"}
        label="Contraseña:"
        id="password"
        register={register("password", {
          required: { value: true, message: "La contraseña es requerida" },
        })}
        error={errors.password}
        placeholder="**********"
        IconComponent={showPassword ? EyeSlashIcon : EyeIcon} // Cambia el ícono dinámicamente
        onIconClick={handleShowPassword} // Maneja el clic en el ícono
      />

      <InputField
        type={showPassword ? "text" : "password"}
        label="Confirmar contraseña:"
        id="confirm_password"
        register={register("confirm_password", {
          required: { value: true, message: "La confirmación es requerida" },
          validate: (value) =>
            value === getValues("password") || "Las contraseñas no coinciden",
        })}
        error={errors.confirm_password}
        placeholder="Ingresa nuevamente la contraseña"
        IconComponent={showPassword ? EyeSlashIcon : EyeIcon} // Cambia el ícono dinámicamente
        onIconClick={handleShowPassword} // Maneja el clic en el ícono
      />

      <ButtonSubmit isPending={isPending} messageLoading="Creando cuenta...">
        Crear cuenta
      </ButtonSubmit>
    </Form>
  );
}
export default RegisterForm;
