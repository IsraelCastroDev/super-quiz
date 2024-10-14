import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="py-2 px-14 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 bg-gray-200/50 backdrop-blur">
      <Link to={"/"} className="text-3xl font-bold">
        Super Quiz
      </Link>
      <div className="flex items-center gap-4">
        <Link to={"/iniciar-sesion"} className={"link"}>
          Iniciar Sesión
        </Link>
        <Link to={"/registrarse"} className={"link"}>
          Registrarse
        </Link>
      </div>
    </header>
  );
}
export default Header;
