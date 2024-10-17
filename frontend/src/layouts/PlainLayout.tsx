import { BackLink } from "@/components/ui";
import { Outlet } from "react-router-dom";

export function PlainLayout() {
  return (
    <>
      <BackLink />
      <main>
        <Outlet />
      </main>
    </>
  );
}
