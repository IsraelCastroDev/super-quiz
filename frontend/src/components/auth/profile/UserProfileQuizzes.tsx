import { Loader, Text } from "@/components/ui";
import { useDeleteQuiz } from "@/hooks/useAuthUser";
import { UserQuiz, UserQuizzes } from "@/schemas";
import { TrashIcon } from "@heroicons/react/24/solid";

interface Props {
  userQuizzes: UserQuizzes | undefined;
  isLoading: boolean;
}

export function UserProfileQuizzes({ userQuizzes, isLoading }: Props) {
  const { mutate, deletingQuizId, setDeletingQuizId, isPending } =
    useDeleteQuiz();

  const handleDeleteQuiz = (idQuiz: UserQuiz["_id"]) => {
    setDeletingQuizId(idQuiz);
    mutate(idQuiz);
  };

  return (
    <div>
      <div>
        <Text as="p" category="title">
          Mis Super Quizzes - {userQuizzes?.length}
        </Text>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-3 border border-slate-700 px-3 py-5 rounded-md mt-5 relative">
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
                className="border border-slate-700 p-2 max-w-80 rounded-md relative"
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

                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  type="button"
                  className="absolute top-2 right-2 disabled:opacity-40 disabled:cursor-default"
                  disabled={isPending && deletingQuizId === quiz._id} // Deshabilitar cuando está eliminando
                >
                  {isPending && deletingQuizId === quiz._id ? (
                    <Loader /> // Mostrar Loader solo para el quiz que se está eliminando
                  ) : (
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  )}
                </button>
              </div>
            ))
          ))
        )}
      </div>
    </div>
  );
}
