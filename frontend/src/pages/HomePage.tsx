import { useAppPersists } from "@/store/useAppPersists";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";

function HomePage() {
  const userAuth = useAppPersists((state) => state.userAuth);

  return (
    <>
      <HeroSection userAuth={userAuth} />
      <CategoriesSection />
    </>
  );
}
export default HomePage;
