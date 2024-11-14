import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogoutUser, useSearchQuiz } from "@/hooks";
import { useAppPersists } from "@/store";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Text,
  Loader,
  MenuProfile,
  Modal,
  ErrorMessage,
} from "@/components/ui";
import { ButtonSubmit, InputField } from "@components/ui/Form";
import { MonuMobileLoggedIn } from "@/components/Header/MenuMobileLoggedIn";
import MenuMobileLoggedOut from "./MenuMobileLoggedOut";

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
      <header className="py-2 px-5 md:px-10 lg:px-15 flex flex-row justify-between items-center sticky top-4 z-10 bg-gray-200/50 backdrop-blur-sm border border-slate-700 rounded-md w-full">
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
            <MonuMobileLoggedIn
              userAuth={userAuth}
              handleLogout={handleLogout}
            />
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

            {/*MODO MOBILE - NO AUTH */}
            <MenuMobileLoggedOut />
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
