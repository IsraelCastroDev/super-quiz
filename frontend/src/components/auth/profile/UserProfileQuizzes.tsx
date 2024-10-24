import { deleteQuiz } from "@/api/quizAPI";
import { Loader, Text } from "@/components/ui";
import { UserQuiz, UserQuizzes } from "@/schemas";
import { useAppStore } from "@/store";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  userQuizzes: UserQuizzes | undefined;
  isLoading: boolean;
}

export function UserProfileQuizzes({ userQuizzes, isLoading }: Props) {
  const addNotification = useAppStore((state) => state.addNotification);
  const queryClient = useQueryClient();
  // Para rastrear el quiz que se está eliminando
  const [deletingQuizId, setDeletingQuizId] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: (data) => {
      addNotification({
        title: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user-quizzes"] });
      setDeletingQuizId(null); // Resetear el ID del quiz que se estaba eliminando
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
      setDeletingQuizId(null); // Resetear el ID del quiz en caso de error
    },
  });

  const handleDeleteQuiz = (idQuiz: UserQuiz["_id"]) => {
    setDeletingQuizId(idQuiz); // Establecer el ID del quiz que se está eliminando
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
