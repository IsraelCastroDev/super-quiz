import {
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

        <SheetContent side={"right"} className="w-[80%] bg-gray-200 md:hidden">
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
              <SheetClose asChild className="max-w-72 w-full mx-auto">
                <Link
                  to={"/iniciar-sesion"}
                  className={
                    "bg-slate-700 hover:bg-slate-800 text-white py-3 px-4 rounded-3xl w-full text-center"
                  }
                >
                  Iniciar Sesión
                </Link>
              </SheetClose>

              <SheetClose asChild className="max-w-72 w-full mx-auto">
                <Link
                  to={"/registrarse"}
                  className={
                    "border border-slate-900 hover:bg-white py-3 px-4 rounded-3xl text-black w-full text-center transition-colors duration-300 ease-linear"
                  }
                >
                  Registrarse
                </Link>
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
