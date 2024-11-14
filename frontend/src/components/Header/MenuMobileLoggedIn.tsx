import {
  Separator,
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
import { UserAuthData } from "@/types";
import {
  ArrowRightCircleIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface Props {
  userAuth: UserAuthData;
  handleLogout: () => void;
}

export function MonuMobileLoggedIn({ userAuth, handleLogout }: Props) {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild className="z-50">
          <button className="outline-none">
            <UserCircleIcon className="w-10 h-10" />
          </button>
        </SheetTrigger>

        <SheetContent side={"right"} className="w-[80%] bg-gray-200 md:hidden">
          <SheetHeader>
            <SheetTitle className="text-4xl md:text-6xl">
              ¡Hola {userAuth.name}!
            </SheetTitle>
            <SheetDescription className="text-lg">
              !Que gusto verte otra vez¡
            </SheetDescription>
          </SheetHeader>

          <Separator className="bg-slate-900 my-3" />

          <div className="space-y-3 mt-4">
            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-col items-start gap-2 sm:hidden w-full">
                <Text as="h2" category="subtitle">
                  Ingresa un código
                </Text>
                <input className="font-semibold w-full bg-gray-300 border border-slate-900 rounded-md p-2 outline-none flex-1" />
              </div>

              <SheetClose asChild>
                <Link to={"/perfil"} className="flex items-center gap-2">
                  <UserCircleIcon className="w-8 h-8" />
                  <Text as="h2" category="subtitle">
                    Perfil
                  </Text>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link to={"/quiz/crear"} className="flex items-center gap-2">
                  <PlusCircleIcon className="w-8 h-8" />
                  <Text as="h2" category="subtitle">
                    Crear un Super Quiz
                  </Text>
                </Link>
              </SheetClose>
            </div>

            <Separator className="bg-slate-900 my-3" />
            <SheetClose asChild>
              <button
                onClick={() => handleLogout()}
                className="flex items-center gap-2"
              >
                <ArrowRightCircleIcon className="w-8 h-8" />
                <Text as="h2" category="subtitle">
                  Cerrar sesión
                </Text>
              </button>
            </SheetClose>
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
