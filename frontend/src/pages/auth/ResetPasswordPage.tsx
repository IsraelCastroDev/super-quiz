import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import TokenPinForm from "@/components/auth/TokenPinForm";
import { useAppStore } from "@/store/useAppStore";

function ResetPassword() {
  const showFormResetPassword = useAppStore((state) => state.showTokenPinForm);

  return (
    <main>
      <section className="max-w-[500px] mx-auto">
        {!showFormResetPassword ? <TokenPinForm /> : <ResetPasswordForm />}
      </section>
    </main>
  );
}
export default ResetPassword;
