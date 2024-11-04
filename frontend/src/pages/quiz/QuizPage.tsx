import { getCategorieById, getQuizById } from "@/api/quizAPI";
import { QuizPresentation } from "@/components/quiz/QuizGame";
import { Loader } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function QuizPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  const { quizId } = useParams<{ quizId: string }>();

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quizDetail", quizId],
    queryFn: () => getQuizById(quizId),
    retry: 0,
  });

  const { data: quizCategories } = useQuery({
    queryKey: ["getCategorie", quiz?._id],
    queryFn: async () => {
      if (!quiz || !quiz.categories) return [];

      const promises = quiz.categories.map((categorie) =>
        getCategorieById(categorie.category)
      );
      return Promise.all(promises);
    },
    enabled: !!quiz,
    retry: 0,
  });

  const handleShowQuiz = () => setShowQuiz(true);

  return (
    <section>
      {!showQuiz && isLoading ? (
        <Loader />
      ) : (
        <QuizPresentation
          handleShowQuiz={handleShowQuiz}
          quiz={quiz}
          categories={quizCategories}
        />
      )}
    </section>
  );
}
