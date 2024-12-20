import { Link } from "react-router-dom";

export function BackLink() {
  return (
    <div className="absolute top-10 left-4 z-20">
      <Link
        to={"/"}
        className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded"
      >
        Volver a inicio
      </Link>
    </div>
  );
}
