import Text from "@/components/ui/Typography";
import Button from "../components/ui/Button";
import { useAppPersists } from "@/store/useAppPersists";

function HomePage() {
  const userAuth = useAppPersists((state) => state.userAuth);

  return (
    <>
      <section className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>

        <div className="max-w-[700px] mx-auto z-50 space-y-7">
          <div className="flex flex-col gap-4 justify-center items-center">
            <Text
              category="big"
              degraded={true}
              as="h2"
              className="text-center"
            >
              ¿Puedes superar a Super Quiz?
            </Text>
            <div className="px-10 flex justify-center">
              <Text as="h3" category="subtitle" className="text-pretty">
                Elige entre diversas categorías, temas de tu agrado, obtén un
                puntaje y sube en el ranking de mejores jugadores.
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button to={"/"}>¡Empieza a jugar ya!</Button>
            <Button to={userAuth ? "/quiz/crear" : "/registrarse"}>
              Crea tu propio Super Quiz
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <h2>Todas las categorías</h2>
      </section>
    </>
  );
}
export default HomePage;
