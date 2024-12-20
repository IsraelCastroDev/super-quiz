import { XCircleIcon } from "@heroicons/react/24/solid";
import { Text } from "./Typography";
import { useEffect } from "react";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  showCloseIcon?: boolean;
  onClose: () => void;
}

export function Modal({
  title,
  children,
  isOpen,
  onClose,
  showCloseIcon = true,
}: ModalProps) {
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
        className="bg-white py-7 md:py-10 px-3 md:px-5 rounded-md shadow-lg relative max-w-3xl min-w-80 md:min-w-96 w-auto"
        onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic dentro del modal
      >
        {title && (
          <Text as="h2" category="title" className="text-lg font-semibold">
            {title}
          </Text>
        )}

        {children}

        {showCloseIcon && (
          <button onClick={onClose} className="absolute top-1 right-1">
            <XCircleIcon className="w-6 h-6 text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
}

interface ButtonModalPropa extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: "slate" | "gray";
  type: "submit" | "reset" | "button" | undefined;
}

export function ButtonModal({
  children,
  color = "slate",
  type,
  ...props
}: ButtonModalPropa) {
  return (
    <button
      type={type}
      {...props}
      className={`p-2 ${
        color === "gray"
          ? "bg-gray-300 hover:bg-gray-400 text-black"
          : "bg-slate-700 hover:bg-slate-700 text-white"
      } rounded-md w-full`}
    >
      {children}
    </button>
  );
}
