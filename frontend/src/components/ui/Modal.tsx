import { XCircleIcon } from "@heroicons/react/24/solid";
import { Text } from "./Typography";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-20"
      onClick={onClose} // Cerrar al hacer clic fuera del modal
    >
      <div
        className="bg-white py-10 px-5 rounded-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic dentro del modal
      >
        <Text as="h2" category="title" className="text-lg font-semibold">
          Ingresa el código del Super Quiz
        </Text>

        {children}

        <button onClick={onClose} className="absolute top-1 right-1">
          <XCircleIcon className="w-6 h-6 text-red-500" />
        </button>
      </div>
    </div>
  );
}
