import { QuizPresentation } from "@/components/quiz/QuizGame";
import { Loader } from "@/components/ui";
import { useQuizPresentation } from "@/hooks";

export function QuizPage() {
  const {
    quiz,
    quizCategories,
    showDialogConfirm,
    isLoading,
    handleHideDialogConfirm,
    handleShowDialogConfirm,
    handleShowQuiz,
  } = useQuizPresentation();

  return (
    <section className="relative">
      {isLoading ? (
        <Loader />
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
