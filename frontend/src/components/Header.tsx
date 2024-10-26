import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogoutUser } from "@/hooks";
import { useAppPersists } from "@/store";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Text, Loader, MenuProfile, Modal } from "@/components/ui";
import { ButtonSubmit, InputField } from "@components/ui/Form";

function Header() {
  const userAuth = useAppPersists((state) => state.userAuth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const { mutate, isPending } = useLogoutUser();

  const handleShowProfileMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };
  const handleLogout = () => mutate();

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {isPending && <Loader />}
      <div className="relative">
        <header className="py-2 px-5 md:px-16 flex flex-row justify-between items-center fixed right-0 left-0 z-10 bg-gray-200/50 backdrop-blur-sm border border-slate-700 rounded-md">
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form className="space-y-2">
            <InputField id="code-quiz" />
            <ButtonSubmit>Buscar</ButtonSubmit>
          </form>
        </Modal>
      )}
    </>
  );
}

export default Header;
