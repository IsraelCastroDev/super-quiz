import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Text,
} from "@/components/ui";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function MenuMobileLoggedOut() {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild className="z-50">
          <button className="outline-none">
            <Bars3Icon className="w-8 h-8" />
          </button>
        </SheetTrigger>

        <SheetContent
          side={"right"}
          className="w-[85%] sm:w-[80%] bg-gray-200 md:hidden"
        >
          <SheetHeader>
            <SheetTitle className="text-4xl md:text-6xl">
              <Link to={"/"}>Super Quiz</Link>
            </SheetTitle>

            <SheetDescription className="text-lg">
              ¡Bienvenido, inicia sesión o regístrate!
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-4">
            <div className="flex flex-col items-start sm:hidden gap-2">
              <Text as="h2" category="subtitle">
                Ingresa un código
              </Text>
              <input className="font-semibold w-full bg-gray-300 rounded-md border border-slate-900 p-2 outline-none flex-1" />
            </div>

            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Button to={"/iniciar-sesion"} variant="solid" size="md">
                  Iniciar Sesión
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button to={"/registrarse"} variant="outline" size="md">
                  Registrarse
                </Button>
              </SheetClose>
            </div>
          </div>
          <SheetFooter className="mt-10">
            <Text as="h1" category="body" className="font-semibold text-center">
              Desarrollado por{" "}
              <Link
                to={"https://www.linkedin.com/in/juan-castro-chozo/"}
                target="_blank"
                rel="nooponer noreferrer"
                className="underline"
              >
                Israel Castro
              </Link>
            </Text>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
