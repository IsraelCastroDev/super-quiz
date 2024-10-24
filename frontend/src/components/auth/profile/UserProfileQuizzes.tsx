import { Loader, Text } from "@/components/ui";
import { UserQuizzes } from "@/schemas";

interface Props {
  userQuizzes: UserQuizzes | undefined;
  isLoading: boolean;
}

export function UserProfileQuizzes({ userQuizzes, isLoading }: Props) {
  return (
    <div>
      <div>
        <Text as="p" category="title">
          Mis Super Quizzes - {userQuizzes?.length}
        </Text>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,ifr))] border border-slate-700 px-3 py-5 rounded-md mt-5 relative">
        {isLoading ? (
          <Loader />
        ) : (
          userQuizzes &&
          (userQuizzes.length === 0 ? (
            <Text as="p" category="body" className="font-semibold">
              Aún no haz creado ningún Super Quiz
            </Text>
          ) : (
            userQuizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="border border-slate-700 p-2 max-w-80 rounded-md"
              >
                <div className="flex items-center gap-x-2">
                  <Text as="h2" category="body" className="font-semibold">
                    Título:
                  </Text>
                  <Text as="p" category="body">
                    {quiz.title}
                  </Text>
                </div>

                <div className="flex items-center gap-x-2">
                  <Text as="h2" category="body" className="font-semibold">
                    Score:
                  </Text>
                  <Text as="p" category="body">
                    {quiz.score}
                  </Text>
                </div>

                <div>
                  <Text as="h2" category="body" className="font-semibold">
                    Categorías:
                  </Text>
                  <ul className="flex flex-wrap gap-x-1">
                    {quiz.categories.map((cat) => (
                      <li key={cat.category._id}>
                        <Text as="p" category="body">
                          {cat.category.name},
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ))
        )}
      </div>
    </div>
  );
}
