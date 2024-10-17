import { CategoriesSection, HeroSection } from "@/components/home";
import { useAppPersists } from "@/store";

export function HomePage() {
  const userAuth = useAppPersists((state) => state.userAuth);

  return (
    <>
      <HeroSection userAuth={userAuth} />
      <CategoriesSection />
    </>
  );
}
