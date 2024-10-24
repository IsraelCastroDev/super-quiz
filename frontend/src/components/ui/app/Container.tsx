import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  const { pathname } = useLocation();
  return (
    <section className={`${pathname === "/" ? "mt-24" : "mt-4"} relative`}>
      {children}
    </section>
  );
}
