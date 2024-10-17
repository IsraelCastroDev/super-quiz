import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogoutUser } from "@/hooks";
import { useAppPersists } from "@/store";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Text, Loader, MenuProfile } from "@/components/ui";

function Header() {
  const userAuth = useAppPersists((state) => state.userAuth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { mutate, isPending } = useLogoutUser();

  const handleShowProfileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  };
  const handleLogout = () => mutate();

  return (
    <>
      {isPending && <Loader />}
      <div className="relative">
        <header className="py-2 px-5 md:px-16 flex flex-row justify-between items-center sticky top-0 w-full z-10 bg-gray-200/50 backdrop-blur-sm border border-slate-700 rounded-md">
          <Link to={"/"}>
            <Text as="h1" category="title">
              Super Quiz
            </Text>
          </Link>
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

                <div className="flex items-center gap-2">
                  <Text as="h3" category="body" className="font-black">
                    {userAuth.username}
                  </Text>
                </div>
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
    </>
  );
}
export default Header;
