import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useValidateToken } from "@/hooks";
import { useAppStore } from "@/store";
import { Text } from "@/components/ui";

export function TokenPinForm() {
  const { mutate } = useValidateToken();
  const tokenResetPassword = useAppStore((state) => state.tokenResetPassword);
  const setTokenResetPassword = useAppStore(
    (state) => state.setTokenResetPassword
  );

  const handleChange = (value: string) => setTokenResetPassword(value);

  const handleComplete = (value: string) => {
    mutate(value);
  };

  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <div className="flex flex-col gap-3">
        <div className="space-y-3">
          <Text as="h1" category="big" className="text-center">
            Super Quiz
          </Text>
          <Text as="h2" category="title">
            Ingresa el token que te enviamos a tu correo
          </Text>
        </div>

        <div className="flex items-center justify-center gap-5">
          <PinInput
            value={tokenResetPassword ? tokenResetPassword : ""}
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
      </div>
    </div>
  );
}
