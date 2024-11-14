import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer";

export function HomeLayout() {
  return (
    <>
      <Header />
      <main className="px-2 py-4 md:px-0 md:py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
