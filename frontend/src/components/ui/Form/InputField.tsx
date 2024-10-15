import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Label from "./Label";
import ErrorMessage from "../ErrorMessage";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  IconComponent?: React.ElementType;
  onIconClick?: () => void;
}

function InputField({
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
      <div className="flex items-center justify-between  border border-slate-700 shadow-sm rounded-md w-full px-1">
        <input
          id={id}
          className="p-2 w-full outline-none"
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
export default InputField;
