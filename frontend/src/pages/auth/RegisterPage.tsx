import { RegisterForm } from "@/components/auth";
import { Text } from "@/components/ui";
import { ContainerForm } from "@/components/ui/Form";
import { useRegisterUser } from "@/hooks";
import { UserFormData } from "@/types";

export function RegisterPage() {
  const mutationRegisterUser = useRegisterUser();
  const { mutate, isPending } = mutationRegisterUser;

  const onSubmit = (data: UserFormData) => {
    mutate(data);
  };

  return (
    <section>
      <ContainerForm>
        <Text as="h1" category="title" className="text-center">
          Regístrate y crea tus propios Super Quiz 🚀
        </Text>
        <RegisterForm onSubmit={onSubmit} isPending={isPending} />
      </ContainerForm>
    </section>
  );
}
