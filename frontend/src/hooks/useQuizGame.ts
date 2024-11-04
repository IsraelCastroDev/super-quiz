import { getCategorieById, getQuizById } from "@/api/quizAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function useQuizPresentation() {
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);
  const navigate = useNavigate();

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
    navigate(`/quiz/${quiz?._id}/game`);
    setShowDialogConfirm(false);
  };

  const handleShowDialogConfirm = () => setShowDialogConfirm(true);
  const handleHideDialogConfirm = () => setShowDialogConfirm(false);

  return {
    quiz,
    quizCategories,
    setShowDialogConfirm,
    showDialogConfirm,
    handleHideDialogConfirm,
    handleShowQuiz,
    handleShowDialogConfirm,
    isLoading,
    navigate,
  };
}

export function useQuizGame() {
  return {};
}
