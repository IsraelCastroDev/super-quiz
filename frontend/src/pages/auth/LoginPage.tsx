import LoginForm from "@/components/auth/LoginForm";
import { Text } from "@/components/ui";
import { useLoginUser } from "@/hooks/useAuthUser";
import { UserLoginData } from "@/types";

export function LoginPage() {
  const { mutate, isPending } = useLoginUser();
  const onSubmit = (data: UserLoginData) => mutate(data);

  return (
    <section>
      <div className="max-w-[35rem] mx-auto px-10 py-5 border border-slate-700 shadow-md rounded-md mt-5 space-y-3">
        <Text as="h1" category="title" className="text-center">
          ¡Bienvenido de nuevo!
        </Text>
        <LoginForm onSubmit={onSubmit} isPending={isPending} />
      </div>
    </section>
  );
}
