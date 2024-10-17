import { useParams } from "react-router-dom";

export function CategoryQuizPage() {
  const { slug } = useParams<{ slug: string }>();
  return <div>CategoryQuizPage {slug}</div>;
}
