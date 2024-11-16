import { UserAuthData } from "@/types";
import { Button, Text } from "@/components/ui";

interface Props {
  userAuth: UserAuthData | null;
}

export function HeroSection({ userAuth }: Props) {
  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] -z-10"></div>

      <div className="max-w-[800px] w-full mx-auto space-y-7">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Text
            category="big"
            degraded={true}
            as="h2"
            className="text-center text-balance"
          >
            Juega o crea tu propio Super Quiz.
          </Text>
          <div className="flex justify-center">
            <Text
              as="h3"
              category="subtitle"
              className="text-pretty text-center"
            >
              Elige entre diversas categorías, temas de tu agrado, obtén un
              puntaje y sube en el ranking de mejores jugadores.
            </Text>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button to={"/"} variant="solid" size="lg">
            ¡Empieza a jugar ya!
          </Button>
          <Button
            to={userAuth ? "/quiz/crear" : "/registrarse"}
            variant="solid"
            size="lg"
          >
            Crea tu propio Super Quiz
          </Button>
        </div>
      </div>
    </section>
  );
}
