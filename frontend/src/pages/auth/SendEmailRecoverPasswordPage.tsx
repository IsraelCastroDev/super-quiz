import Text from "@/components/ui/Typography";
import { useRecoverPassword } from "@/hooks/useLoginUser";

function RecoverPasswordPage() {
  const { mutate, isPending } = useRecoverPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;

    mutate(email);

    e.currentTarget.reset();
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Text as="h1" category="title" className="text-center">
        Super Quiz
      </Text>

      <div className="max-w-[35rem] mx-auto px-10 py-5 border border-slate-700 shadow-md rounded-md mt-5 space-y-3">
        <Text as="h2" category="subtitle" className="text-center">
          ¿Olvidaste tu contraseña?, te ayudamos a recuperarla
        </Text>

        <div className="space-y-3">
          <Text as="p" category="body">
            Ingresa tu correo electrónico y te enviaremos un enlace para
            recuperarla
          </Text>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-slate-700 shadow-sm rounded-md"
              placeholder="Ingresa tu correo electrónico"
            />

            <button
              className="w-full p-2 border bg-slate-700 hover:bg-slate-800 text-white shadow-sm rounded-md disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
export default RecoverPasswordPage;