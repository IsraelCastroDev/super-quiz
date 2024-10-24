import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  styles?: string;
}

export function Container({ children, styles }: Props) {
  const { pathname } = useLocation();
  return (
    <section
      className={`${pathname === "/" ? "mt-24" : "mt-4"} relative ${styles}`}
    >
      {children}
    </section>
  );
}
