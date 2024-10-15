import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function HomeLayout() {
  return (
    <>
      <Header />
      <main className="px-2 py-4 md:px-14 md:py-8">
        <Outlet />
      </main>
    </>
  );
}
export default HomeLayout;
