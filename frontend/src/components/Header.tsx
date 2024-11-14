import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogoutUser, useSearchQuiz } from "@/hooks";
import { useAppPersists } from "@/store";
import {
  ArrowRightCircleIcon,
  Bars3Icon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Text,
  Loader,
  MenuProfile,
  Modal,
  ErrorMessage,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
  Separator,
  SheetFooter,
} from "@/components/ui";
import { ButtonSubmit, InputField } from "@components/ui/Form";

function Header() {
  const userAuth = useAppPersists((state) => state.userAuth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { mutate, isPending } = useLogoutUser();
  const {
    error,
    handleCloseModal,
    handleOpenModal,
    handleSearchQuiz,
    isLoading,
    isModalOpen,
  } = useSearchQuiz();

  const handleShowProfileMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => mutate();

  return (
    <>
      {isPending && <Loader />}
      <header className="py-2 px-5 md:px-10 lg:px-15 flex flex-row justify-between items-center sticky top-0 z-10 bg-gray-200/50 backdrop-blur-sm border border-slate-700 rounded-md w-full">
        <Link to={"/"}>
          <Text as="h1" category="title">
            Super Quiz
          </Text>
        </Link>
        <div className="hidden sm:block">
          <button onClick={handleOpenModal} className="font-semibold">
            Ingresa a un Super Quiz
          </button>
        </div>
        {userAuth ? (
          <nav>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={handleShowProfileMenu}>
                <UserCircleIcon className="w-10 h-10" />
              </button>
              {showProfileMenu && (
                <MenuProfile
                  handleLogout={handleLogout}
                  setShowProfileMenu={setShowProfileMenu}
                />
              )}
              <Text
                as="h3"
                category="body"
                className="font-black hidden md:block"
              >
                {userAuth.username}
              </Text>
            </div>

            {/*MODO MOBILE  - AUTH*/}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild className="z-50">
                  <button className="outline-none">
                    <UserCircleIcon className="w-10 h-10" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side={"right"}
                  className="w-[80%] bg-gray-200 md:hidden"
                >
                  <SheetHeader>
                    <Text as="h1" category="big">
                      ¡Hola {userAuth.name}!
                    </Text>
                  </SheetHeader>

                  <Separator className="bg-slate-900 my-3" />

                  <div className="space-y-3 mt-4">
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex flex-col items-start gap-2 sm:hidden w-full">
                        <Text as="h2" category="subtitle">
                          Ingresa un código
                        </Text>
                        <input className="font-semibold w-full bg-gray-300 rounded-md p-2 outline-none flex-1" />
                      </div>

                      <SheetClose asChild>
                        <Link
                          to={"/perfil"}
                          className="flex items-center gap-2"
                        >
                          <UserCircleIcon className="w-8 h-8" />
                          <Text as="h2" category="subtitle">
                            Perfil
                          </Text>
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          to={"/quiz/crear"}
                          className="flex items-center gap-2"
                        >
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
                    <Text
                      as="h1"
                      category="body"
                      className="font-semibold text-center"
                    >
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
          </nav>
        ) : (
          <nav className="flex items-center gap-4">
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link
                to={"/iniciar-sesion"}
                className="bg-slate-700 hover:bg-slate-800 text-white py-1 px-3 rounded-3xl text-center"
              >
                Iniciar Sesión
              </Link>
              <Link
                to={"/registrarse"}
                className="border border-slate-900 hover:bg-white py-1 px-3 rounded-3xl text-black text-center"
              >
                Registrarse
              </Link>
            </div>

            {/*MODO MOBILE */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild className="z-50">
                  <button className="outline-none">
                    <Bars3Icon className="w-8 h-8" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side={"right"}
                  className="w-[80%] bg-gray-200 md:hidden"
                >
                  <SheetHeader>
                    <Link to={"/"}>
                      <Text as="h1" category="big">
                        Super Quiz
                      </Text>
                    </Link>
                  </SheetHeader>

                  <div className="space-y-6 mt-4">
                    <div className="flex flex-col items-start sm:hidden gap-2">
                      <Text as="h2" category="subtitle">
                        Ingresa un código
                      </Text>
                      <input className="font-semibold w-full bg-gray-300 rounded-md p-2 outline-none flex-1" />
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
                    <Text
                      as="h1"
                      category="body"
                      className="font-semibold text-center"
                    >
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
          </nav>
        )}
      </header>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="Ingresa el código del Super Quiz"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSearchQuiz} className="space-y-2">
            <InputField id="enter-code-quiz" name="quizCode" />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonSubmit isPending={isLoading} messageLoading="Buscando">
              Buscar
            </ButtonSubmit>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Header;
