import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  isAllowed,
  children,
  redirectTo = "/",
}: Props) {
  if (!isAllowed) return <Navigate to={redirectTo} />;

  return children ? children : <Outlet />;
}
