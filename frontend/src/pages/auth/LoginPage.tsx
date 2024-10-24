import { LoginForm } from "@/components/auth";
import { Text } from "@/components/ui";
import { ContainerForm } from "@/components/ui/Form";
import { useLoginUser } from "@/hooks";
import { UserLoginData } from "@/types";

export function LoginPage() {
  const { mutate, isPending } = useLoginUser();
  const onSubmit = (data: UserLoginData) => mutate(data);

  return (
    <section className="h-[calc(100vh-9rem)] flex flex-col justify-center">
      <ContainerForm>
        <Text as="h1" category="title" className="text-center">
          ¡Bienvenido de nuevo!
        </Text>
        <LoginForm onSubmit={onSubmit} isPending={isPending} />
      </ContainerForm>
    </section>
  );
}
