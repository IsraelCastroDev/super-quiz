type HtmlTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type Category = "title" | "subtitle" | "body" | "big";

interface TextProps {
  as: HtmlTag;
  category: Category;
  children: React.ReactNode;
  className?: string;
  degraded?: boolean;
}

export function Text({
  as: Element,
  category,
  children,
  className,
  degraded = false,
}: TextProps) {
  let baseClass = "";
  const degradedClass = `${
    degraded
      ? "bg-gradient-to-tl from-gray-950 via-sky-800 to-sky-950 bg-clip-text text-transparent"
      : ""
  }`;

  switch (category) {
    case "big":
      baseClass = `${degradedClass} text-5xl md:text-6xl font-bold`;
      break;
    case "title":
      baseClass = `${degradedClass} text-2xl md:text-3xl font-bold`;
      break;
    case "subtitle":
      baseClass = `${degradedClass} text-lg md:text-xl font-bold`;
      break;
    case "body":
      baseClass = `${degradedClass} text-sm md:text-base font-normal`;
      break;

    default:
      break;
  }
  return <Element className={`${baseClass} ${className}`}>{children}</Element>;
}
