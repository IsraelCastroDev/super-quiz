import { useLogoutUser } from "@/hooks/useAuthUser";
import { useAppPersists } from "@/store/useAppPersists";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Loader from "./ui/Loader/Loader";
import { useState } from "react";
import MenuProfile from "./ui/MenuProfile";

function Header() {
  const userAuth = useAppPersists((state) => state.userAuth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { mutate, isPending } = useLogoutUser();

  const handleShowProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const handleLogout = () => mutate();

  return (
    <>
      {isPending && <Loader />}
      <header className="py-2 px-14 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 bg-gray-200/50 backdrop-blur-sm border border-slate-700 rounded-md">
        <Link to={"/"} className="text-3xl font-bold">
          Super Quiz
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
                <h3 className="text-lg font-bold">{userAuth.username}</h3>
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
    </>
  );
}
export default Header;
