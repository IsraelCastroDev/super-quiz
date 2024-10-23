import { SelectHTMLAttributes } from "react";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";
import { Label } from "@/components/ui/Form/Label";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  label: string;
  id: string;
  error?: Merge<FieldError, undefined>;
  register: UseFormRegisterReturn;
  IconComponent?: React.ElementType;
  onIconClick?: () => void;
}

export function SelectField({
  children,
  label,
  id,
  error,
  register,
  IconComponent,
  onIconClick,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} text={label} />
      <div className="flex items-center justify-between border border-slate-700 shadow-sm rounded-md w-full px-1">
        <select
          id={id}
          {...register}
          {...props}
          className="p-2 w-full outline-none"
        >
          {children}
        </select>
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
