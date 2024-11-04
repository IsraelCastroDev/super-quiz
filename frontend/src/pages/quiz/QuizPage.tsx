import { getCategorieById, getQuizById } from "@/api/quizAPI";
import { QuizGame, QuizPresentation } from "@/components/quiz/QuizGame";
import { Loader } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function QuizPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

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

  const handleShowQuiz = () => {
    setShowQuiz(true);
    setShowDialogConfirm(false);
  };
  const handleHideQuiz = () => {
    setShowQuiz(false);
    setShowDialogConfirm(false);
  };

  const handleShowDialogConfirm = () => setShowDialogConfirm(true);
  const handleHideDialogConfirm = () => setShowDialogConfirm(false);

  return (
    <section className="relative">
      {!showQuiz && isLoading ? (
        <Loader />
      ) : showQuiz ? (
        <QuizGame
          handleHideDialogConfirm={handleHideDialogConfirm}
          handleHideQuiz={handleHideQuiz}
          handleShowDialogConfirm={handleShowDialogConfirm}
          showDialogConfirm={showDialogConfirm}
        />
      ) : (
        <QuizPresentation
          handleShowQuiz={handleShowQuiz}
          handleShowDialogConfirm={handleShowDialogConfirm}
          handleHideDialogConfirm={handleHideDialogConfirm}
          showDialogConfirm={showDialogConfirm}
          quiz={quiz}
          categories={quizCategories}
        />
      )}
    </section>
  );
}
