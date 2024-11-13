import { getCategorieById, getQuizById } from "@/api/quizAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
  const { quizId } = useParams<{ quizId: string }>();
  const [nextIndex, setNextIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: string; answerId: string }[]
  >([]);
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);
  // timer
  const [startTimer, setStartTimer] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);

  const { handleSubmit } = useForm();

  useEffect(() => {
    setStartTimer(true);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      setStartTimer(false);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined = undefined;

    if (startTimer) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              setStartTimer(false);
              return 0;
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTimer, minutes]);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quizGame", quizId],
    queryFn: () => getQuizById(quizId),
    retry: 0,
  });

  useEffect(() => {
    if (quiz?.duration) {
      setMinutes(quiz.duration);
    }
  }, [quiz]);

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter(
        (answer) => answer.questionId !== questionId
      );
      return [...updatedAnswers, { questionId, answerId }];
    });
  };

  const handleShowDialogConfirm = () => setShowDialogConfirm(true);
  const handleHideConfirm = () => setShowDialogConfirm(false);

  const handleIncrementNextIndex = () => setNextIndex(nextIndex + 1);
  const handleDecreaseNextIndex = () => setNextIndex(nextIndex - 1);

  const onSubmit = () => {
    if (selectedAnswers.length !== quiz?.questions.length) {
      alert("Por favor responde a todas las preguntas antes de finalizar.");
      return;
    }

    const answersPayload = selectedAnswers.map((answer) => ({
      question: answer.questionId,
      answer: answer.answerId,
    }));

    console.log("Respuestas enviadas:", answersPayload);

    // Aquí puedes enviar `answersPayload` a un backend o manejarlo según sea necesario.
  };

  const progressValue = useMemo(
    () => (quiz ? ((nextIndex + 1) / quiz.questions.length) * 100 : 0),
    [nextIndex, quiz]
  );

  return {
    quiz,
    isLoading,
    progressValue,
    selectedAnswers,
    showDialogConfirm,
    seconds,
    minutes,
    nextIndex,
    onSubmit,
    handleSubmit,
    handleAnswerChange,
    handleDecreaseNextIndex,
    handleIncrementNextIndex,
    handleHideConfirm,
    handleShowDialogConfirm,
    setShowDialogConfirm,
  };
}
