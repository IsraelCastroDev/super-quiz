import { Text } from "@/components/ui";
import { useConfirmAccount } from "@/hooks/useAuthUser";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmAccount() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const { mutate } = useConfirmAccount();

  const handleChange = (value: string) => setToken(value);
  const handleComplete = (value: string) => {
    mutate(value);
    navigate("/iniciar-sesion");
  };

  return (
    <main>
      <section className="flex flex-col items-center justify-center h-screen gap-4 max-w-[500px] mx-auto">
        <div className="space-y-3">
          <Text as="h1" category="big" className="text-center">
            Super Quiz
          </Text>
          <Text as="h2" category="title" className="text-center">
            Confirma tu cuenta de Super Quiz y empieza a jugar.
          </Text>
        </div>

        <div className="flex gap-5 items-center justify-center">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 md:w-14 border border-slate-700 p-3 text-center" />
            <PinInputField className="w-10 md:w-14 border border-slate-700 p-3 text-center" />
            <PinInputField className="w-10 md:w-14 border border-slate-700 p-3 text-center" />
            <PinInputField className="w-10 md:w-14 border border-slate-700 p-3 text-center" />
            <PinInputField className="w-10 md:w-14 border border-slate-700 p-3 text-center" />
            <PinInputField className="w-10 md:w-14 border border-slate-700 p-3 text-center" />
          </PinInput>
        </div>
      </section>
    </main>
  );
}
export default ConfirmAccount;
