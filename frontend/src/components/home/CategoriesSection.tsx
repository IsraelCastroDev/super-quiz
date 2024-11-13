import { useQuery } from "@tanstack/react-query";
import { Text, Skeleton } from "@/components/ui";
import { getQuizCategories } from "@/api/quizAPI";
import { Link } from "react-router-dom";
import { Container } from "../ui/";

export function CategoriesSection() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getQuizCategories,
  });

  return (
    <Container>
      <div>
        <Text as="h2" category="subtitle">
          Todas las categorías
        </Text>
      </div>

      <div className="relative">
        <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 bg-slate-100 p-5 rounded">
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <li
                key={index}
                className="border border-slate-700 p-5 rounded-md"
              >
                <Skeleton className="w-20 h-4 rounded-sm bg-gray-600" />
                <Skeleton className="w-full h-10 mt-4 rounded-sm bg-gray-600" />
              </li>
            ))
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <li
                key={category._id}
                className="border border-slate-700 p-5 rounded-md"
              >
                <Link to={`/quizzes/category/${category.slug}`}>
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
    </Container>
  );
}
