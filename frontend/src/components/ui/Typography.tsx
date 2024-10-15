type HtmlTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type Category = "title" | "subtitle" | "body" | "brand";

interface TextProps {
  as: HtmlTag;
  category: Category;
  children: React.ReactNode;
  className?: string;
}

function Text({ as: Element, category, children, className }: TextProps) {
  let baseClass = "";

  switch (category) {
    case "brand":
      baseClass =
        "text-5xl md:text-6xl font-bold bg-gradient-to-tl from-gray-950 via-sky-800 to-sky-950 bg-clip-text text-transparent";
      break;
    case "title":
      baseClass = "text-2xl md:text-3xl font-bold";
      break;
    case "subtitle":
      baseClass = "text-xl md:text-2xl font-bold";
      break;
    case "body":
      baseClass = "text-sm md:text-base font-normal";
      break;

    default:
      break;
  }
  return <Element className={`${baseClass} ${className}`}>{children}</Element>;
}

export default Text;
