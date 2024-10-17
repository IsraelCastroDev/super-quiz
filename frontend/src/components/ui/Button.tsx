import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends LinkProps {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <Link
      className="bg-slate-700 hover:bg-slate-800 text-white py-2 px-2 md:p-3 rounded-md text-center cursor-pointer block w-full"
      {...props}
    >
      {children}
    </Link>
  );
}
