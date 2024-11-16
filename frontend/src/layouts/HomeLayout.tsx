import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer";

export function HomeLayout() {
  return (
    <>
      <Header />
      <main className="px-3 md:max-w-[55rem] md:w-full md:mx-auto md:mb-20 md:mt-5 md:p-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
