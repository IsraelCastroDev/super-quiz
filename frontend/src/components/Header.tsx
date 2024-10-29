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

function Header() {
  const userAuth = useAppPersists((state) => state.userAuth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { mutate, isPending } = useLogoutUser();
  const {
    data,
    error,
    handleCloseModal,
    handleOpenModal,
    handleSearchQuiz,
    isLoading,
    isModalOpen,
  } = useSearchQuiz();

  console.log(data);

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
      <header className="py-2 px-5 md:px-16 flex flex-row justify-between items-center sticky top-0 z-10 bg-gray-200/50 backdrop-blur-sm border border-slate-700 rounded-md">
        <Link to={"/"}>
          <Text as="h1" category="title">
            Super Quiz
          </Text>
        </Link>
        <div>
          <button onClick={handleOpenModal} className="font-semibold">
            Ingresa a un Super Quiz
          </button>
        </div>
        {userAuth ? (
          <nav>
            <div className="flex items-center gap-2">
              <button onClick={handleShowProfileMenu}>
                <UserCircleIcon className="w-10 h-10" />
              </button>
              {showProfileMenu && (
                <MenuProfile
                  handleLogout={handleLogout}
                  setShowProfileMenu={setShowProfileMenu}
                />
              )}
              <Text as="h3" category="body" className="font-black">
                {userAuth.username}
              </Text>
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-4">
            <Link to={"/iniciar-sesion"} className={"link"}>
              Iniciar Sesión
            </Link>
            <Link to={"/registrarse"} className={"link"}>
              Registrarse
            </Link>
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
