import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useAppStore } from "@/store";
import { Text } from "@components/ui";
import { ClipboardIcon } from "@heroicons/react/24/solid";

type Variant = "gray" | "slate";

interface Props {
  quizCode: string;
  variant?: Variant;
}

export function QuizCode({ quizCode, variant = "gray" }: Props) {
  const addNotification = useAppStore((state) => state.addNotification);

  const handleCopy = () => {
    navigator.clipboard.writeText(quizCode).then(() => {
      addNotification({
        title: "Copiado en el portapapeles",
        type: "success",
      });
    });
  };

  return (
    <>
      <div
        className={`w-full p-2 ${
          variant === "slate" ? "bg-slate-700 text-white" : "bg-gray-300"
        } border border-slate-700 rounded-md mt-2 relative`}
      >
        <Text as="h3" category="subtitle" className="text-center">
          {quizCode}
        </Text>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleCopy} className="absolute right-1 top-2">
                <ClipboardIcon className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <Text as="p" category="body">
                Copiar en el portapapeles
              </Text>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
