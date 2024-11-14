import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends LinkProps {
  children: React.ReactNode;
  variant: "solid" | "outline";
  size: "sm" | "md" | "lg";
  animation?: boolean;
}

export function Button({
  children,
  variant,
  size,
  animation = false,
  ...props
}: ButtonProps) {
  const solidClass = "bg-slate-700 hover:bg-slate-800 text-white";
  const grayClass = "bg-gray-300 hover:bg-gray-400 text-black";

  let sizeClass = "";
  if (size === "sm") {
    sizeClass = "py-1 px-3 rounded-3xl text-center text-base";
  } else if (size === "md") {
    sizeClass = "py-3 px-4 rounded-3xl w-full text-center text-base";
  } else if (size === "lg") {
    sizeClass = "py-3 px-4 rounded-3xl w-full text-center text-lg";
  }

  return (
    <Link
      className={`${
        variant === "solid" ? solidClass : grayClass
      } ${sizeClass} ${
        animation
          ? "transform transition duration-200 ease-in hover:scale-105 tr"
          : ""
      }`}
      {...props}
    >
      {children}
    </Link>
  );
}
