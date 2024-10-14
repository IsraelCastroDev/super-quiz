import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends LinkProps {
  children: React.ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <Link
      className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded text-center cursor-pointer block"
      {...props}
    >
      {children}
    </Link>
  );
}

export default Button;
