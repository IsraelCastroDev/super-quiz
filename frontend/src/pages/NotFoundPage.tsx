import Text from "@/components/ui/Typography";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
      <div className="max-w-[700px] mx-auto space-y-3">
        <Text as="h1" category="big" degraded={true} className="text-center">
          ¡Página no encontrada!
        </Text>
        <Text as="p" category="subtitle" className="text-center">
          Verifique si la url es correcta o vuelva a la página principal.
        </Text>
      </div>

      <div>
        <Link to={"/"} className="underline font-bold block text-center">
          Volver a la página principal
        </Link>
      </div>
    </section>
  );
}
export default NotFoundPage;
