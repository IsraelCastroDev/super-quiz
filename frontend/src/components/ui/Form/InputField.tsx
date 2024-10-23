import { InputHTMLAttributes } from "react";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "@/components/ui/Form";
import { ErrorMessage } from "@/components/ui";

type BorderStyle = "slate" | "green";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: Merge<FieldError, undefined>;
  register?: UseFormRegisterReturn;
  IconComponent?: React.ElementType;
  onIconClick?: () => void;
  borderStyle?: BorderStyle;
}

export function InputField({
  label,
  id,
  error,
  register,
  IconComponent,
  onIconClick,
  borderStyle = "slate",
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label htmlFor={id} text={label} />}
      <div
        className={`flex items-center justify-between border shadow-sm rounded-md w-full ${
          borderStyle === "slate" ? "border-slate-700" : "border-green-400"
        }`}
      >
        <input
          id={id}
          className={`p-2 w-full outline-none`}
          {...register}
          {...props}
        />
        {IconComponent && (
          <button type="button" onClick={onIconClick}>
            <IconComponent className="w-6 h-6" />
          </button>
        )}
      </div>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
}
