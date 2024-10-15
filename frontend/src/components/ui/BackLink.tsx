import { Link } from "react-router-dom";

function BackLink() {
  return (
    <div className="absolute top-10 left-4">
      <Link
        to={"/"}
        className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded"
      >
        Volver a inicio
      </Link>
    </div>
  );
}
export default BackLink;
