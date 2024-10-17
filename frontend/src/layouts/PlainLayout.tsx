import { BackLink } from "@/components/ui";
import { Outlet } from "react-router-dom";

function PlainLayout() {
  return (
    <>
      <BackLink />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default PlainLayout;
