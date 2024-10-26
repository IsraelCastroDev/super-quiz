import { useAppStore } from "@/store";
import { Text } from "@components/ui";
import { ClipboardIcon } from "@heroicons/react/24/solid";

interface Props {
  quizCode: string;
}

export function QuizCode({ quizCode }: Props) {
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
      <div className="w-full p-2 bg-gray-300 border border-slate-700 rounded-md mt-2 relative">
        <Text as="h3" category="subtitle" className="text-center">
          {quizCode}
        </Text>

        <button
          onClick={handleCopy}
          className="absolute right-1 top-2"
          title="copiar"
        >
          <ClipboardIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
