import { Link } from "react-router-dom";
import Text from "./Typography";
import { useEffect, useRef } from "react";

interface Props {
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

function MenuProfile({ setShowProfileMenu, handleLogout }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowProfileMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-slate-100 top-14 right-16 w-52 p-2 rounded border border-slate-700 text-slate-900"
    >
      <ul className="divide-y divide-slate-700">
        <li
          onClick={() => setShowProfileMenu(false)}
          className="hover:bg-slate-200 p-2"
        >
          <Link to={"/perfil"}>
            <Text as="p" category="body">
              Perfil
            </Text>
          </Link>
        </li>

        <li
          onClick={() => setShowProfileMenu(false)}
          className="hover:bg-slate-200 p-2"
        >
          <Link to={"/quiz/crear"}>
            <Text as="p" category="body">
              Crear quiz
            </Text>
          </Link>
        </li>

        <li
          onClick={() => {
            handleLogout();
            setShowProfileMenu(false);
          }}
          className="hover:bg-gray-300/50 p-2 cursor-pointer"
        >
          <Text as="p" category="body" className="font-bold">
            Cerrar sesión
          </Text>
        </li>
      </ul>
    </div>
  );
}
export default MenuProfile;
