import { Link } from "react-router-dom";
import { Text } from "@components/ui";

export function Footer() {
  return (
    <footer className="bg-slate-700 text-white py-2 absolute right-0 left-0">
      <Text as="h1" category="body" className="font-semibold text-center">
        Desarrollado por{" "}
        <Link
          to={"https://www.linkedin.com/in/juan-castro-chozo/"}
          target="_blank"
          rel="nooponer noreferrer"
          className="underline"
        >
          Israel Castro
        </Link>
      </Text>
    </footer>
  );
}
