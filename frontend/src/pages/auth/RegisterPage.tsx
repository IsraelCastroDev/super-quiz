import Text from "@/components/ui/Typography";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import { UserFormData } from "@/types";

function RegisterPage() {
  const mutationRegisterUser = useRegisterUser();
  const { mutate, isPending } = mutationRegisterUser;

  const onSubmit = (data: UserFormData) => {
    mutate(data);
  };

  return (
    <section>
      <div className="max-w-[35rem] mx-auto px-10 py-5 border border-slate-700 shadow-md rounded-md mt-5 space-y-3">
        <Text as="h1" category="title" className="text-center">
          Regístrate y crea tus propios Super Quiz 🚀
        </Text>
        <RegisterForm onSubmit={onSubmit} isPending={isPending} />
      </div>
    </section>
  );
}
export default RegisterPage;
