type HtmlTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type Category = "title" | "subtitle" | "body";

interface TextProps {
  as: HtmlTag;
  category: Category;
  children: React.ReactNode;
  className?: string;
}

function Text({ as: Element, category, children, className }: TextProps) {
  let baseClass = "";

  switch (category) {
    case "title":
      baseClass = "text-2xl md:text-3xl font-bold";
      break;
    case "subtitle":
      baseClass = "text-xl md:text-2xl font-bold";
      break;
    case "body":
      baseClass = "text-lg md:text-xl font-bold";
      break;

    default:
      break;
  }
  return <Element className={`${baseClass} ${className}`}>{children}</Element>;
}

export default Text;
