import { useParams } from "react-router-dom";

function CategoryQuizPage() {
  const { slug } = useParams<{ slug: string }>();
  return <div>CategoryQuizPage {slug}</div>;
}
export default CategoryQuizPage;
