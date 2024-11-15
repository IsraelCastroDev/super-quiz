import {
  getCategorieById,
  getQuizById,
  submitUserAnswers,
} from "@/api/quizAPI";
import { useAppStore } from "@/store";
import type { SubmitQuizData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export function useQuizGame(quizId: string | undefined) {
  const addNotification = useAppStore((state) => state.addNotification);

  const [nextIndex, setNextIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<SubmitQuizData>(null);
  // modal
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);
  const [showDialogGameOver, setShowDialogGameOver] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);

  // timer
  const [startTimer, setStartTimer] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);

  const [score, setScore] = useState(0);

  const { handleSubmit } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: submitUserAnswers,
    onSuccess: (data) => {
      setScore(data.score);
      setShowModalResult(true);

      // reinciar los states
      setNextIndex(0);
      setSelectedAnswers(null);

      setStartTimer(false);
      setSeconds(60);
    },
    onError: (error) => {
      addNotification({ title: error.message, type: "error" });
      setShowModalResult(false);
    },
  });

  // evitar recargar de pagina casualmente
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

  // cronometro
  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined = undefined;

    if (startTimer) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              setShowDialogGameOver(true);
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

  // traer datos de la api - quiz
  const {
    data: quiz,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["quizGame", quizId],
    queryFn: () => getQuizById(quizId),
    retry: 0,
  });

  // setear los minutos
  useEffect(() => {
    if (quiz?.duration) {
      setMinutes(quiz.duration - 1);
    }
  }, [quiz]);

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = (prev?.answers || []).filter(
        (answer) => answer.questionId !== questionId
      );

      return {
        quizId: quiz ? quiz._id : "",
        answers: [...updatedAnswers, { questionId, answerId }],
      };
    });
  };

  // modal
  const handleShowDialogConfirm = () => {
    setStartTimer(false);
    setShowDialogConfirm(true);
  };
  const handleHideConfirm = () => {
    setStartTimer(true);
    setShowDialogConfirm(false);
  };

  const handleIncrementNextIndex = () => setNextIndex(nextIndex + 1);
  const handleDecreaseNextIndex = () => setNextIndex(nextIndex - 1);

  const handleHideDialogGameOver = () => {
    setShowDialogGameOver(false);
  };

  const handleHideModalResult = () => setShowModalResult(false);

  // barra de progreso cantidad
  const progressValue = useMemo(
    () => (quiz ? ((nextIndex + 1) / quiz.questions.length) * 100 : 0),
    [nextIndex, quiz]
  );

  // reiniciar data - intentar denuevo
  const handleReloadData = () => {
    // hacer una re-consulta para traer datos - reload
    refetch();

    // reinciar los states
    setNextIndex(0);
    setSelectedAnswers(null);

    setStartTimer(true);
    setMinutes(quiz ? quiz.duration : 0);
    setSeconds(60);

    setShowDialogGameOver(false);
  };

  const onSubmit = () => {
    if (selectedAnswers?.answers) {
      if (selectedAnswers?.answers.length !== quiz?.questions.length) {
        alert("Por favor responde a todas las preguntas antes de finalizar.");
        return;
      }
    }

    const answersPayload =
      selectedAnswers?.answers?.map((answer) => ({
        answerId: answer.answerId,
        questionId: answer.questionId,
      })) || null;

    const userQuizPayload = {
      quizData: {
        quizId: quiz ? quiz._id : "",
        answers: answersPayload,
      },
    };

    console.log("Respuestas enviadas:", userQuizPayload);

    mutate(userQuizPayload);
  };

  return {
    quiz,
    score,
    showModalResult,
    isLoading,
    isPending,
    progressValue,
    selectedAnswers,
    showDialogConfirm,
    showDialogGameOver,
    seconds,
    minutes,
    nextIndex,
    onSubmit,
    handleSubmit,
    handleAnswerChange,
    handleDecreaseNextIndex,
    handleIncrementNextIndex,
    handleHideConfirm,
    handleHideDialogGameOver,
    handleShowDialogConfirm,
    handleHideModalResult,
    handleReloadData,
    setShowDialogConfirm,
  };
}
