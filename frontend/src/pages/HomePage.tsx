import Button from "../components/ui/Button";

function HomePage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>

        <div className="max-w-[700px] mx-auto z-50 space-y-7">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-4xl md:text-7xl font-bold text-pretty text-center bg-gradient-to-tl from-gray-950 via-sky-800 to-sky-950 bg-clip-text text-transparent">
              ¿Puedes superar a Super Quiz?
            </h2>
            <div className="px-10 flex justify-center">
              <p className="text-xl font-bold text-center">
                Elige entre diversas categorías, temas de tu agrado, obtén un
                puntaje y sube en el ranking de mejores jugadores.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button to={"/"}>¡Empieza a jugar ya!</Button>
            <Button to={"/registrarse"}>Crea tu propio Super Quiz</Button>
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
