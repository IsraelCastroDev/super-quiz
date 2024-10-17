import { useQuery } from "@tanstack/react-query";
import Text from "../ui/Typography";
import Loader from "../ui/Loader/Loader";
import { getQuizCategories } from "@/api/quizAPI";
import { Link } from "react-router-dom";
import { convertStringToSlug } from "@/utils";
import Container from "../ui/app/Container";

function CategoriesSection() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getQuizCategories,
  });

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Text as="h2" category="subtitle">
              Todas las categorías
            </Text>
          </div>

          <div>
            <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 bg-slate-100 p-5 rounded">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <li
                    key={category._id}
                    className="border border-slate-700 p-5 rounded"
                  >
                    <Link
                      to={`/quizzes/category/${convertStringToSlug(
                        category.name
                      )}`}
                    >
                      <Text as="p" category="subtitle">
                        {category.name}
                      </Text>
                    </Link>

                    <Text as="p" category="body">
                      {category.description}
                    </Text>
                  </li>
                ))
              ) : (
                <li>
                  <Text as="p" category="subtitle">
                    Aún no hay categorías
                  </Text>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </Container>
  );
}
export default CategoriesSection;
