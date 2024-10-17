import { TokenPinForm, ResetPasswordForm } from "@/components/auth";
import { useAppStore } from "@/store";

export function ResetPasswordPage() {
  const showFormResetPassword = useAppStore((state) => state.showTokenPinForm);

  return (
    <main>
      <section className="max-w-[500px] mx-auto">
        {!showFormResetPassword ? <TokenPinForm /> : <ResetPasswordForm />}
      </section>
    </main>
  );
}
