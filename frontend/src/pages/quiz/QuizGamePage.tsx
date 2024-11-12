import { getQuizById } from "@/api/quizAPI";
import { Answers } from "@/components/quiz/QuizGame";
import { Loader, Modal, Text } from "@/components/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export function QuizGame() {
  const { quizId } = useParams<{ quizId: string }>();
  const [nextIndex, setNextIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: string; answerId: string }[]
  >([]);
  const [showDialogConfirm, setShowDialogConfirm] = useState(false);

  const { handleSubmit } = useForm();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quizGame", quizId],
    queryFn: () => getQuizById(quizId),
    retry: 0,
  });

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

  return (
    <section className="h-[calc(100vh-6rem)] flex justify-center items-center">
      {!quiz && isLoading ? (
        <Loader />
      ) : (
        <div className="min-w-80 max-w-3xl w-full mx-auto border border-slate-700 rounded-md p-3 md:p-5">
          <form>
            {quiz ? (
              quiz.questions.map((question, index) => {
                if (nextIndex === index) {
                  return (
                    <div key={question._id}>
                      <div>
                        <div key={question._id}>
                          <Text as="h2" category="title">
                            Pregunta {index + 1} de {quiz.questions.length}
                          </Text>
                          <Text as="h3" category="subtitle">
                            {question.title}
                          </Text>
                          <Answers
                            question={question}
                            selectedAnswer={
                              selectedAnswers.find(
                                (a) => a.questionId === question._id
                              )?.answerId
                            }
                            onAnswerChange={(answerId) =>
                              handleAnswerChange(question._id, answerId)
                            }
                          />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 mt-4">
                          {nextIndex === (quiz?.questions.length ?? 0) - 1 ? (
                            <button
                              type="button"
                              onClick={handleShowDialogConfirm}
                              className="flex items-center justify-center text-center cursor-pointer bg-slate-700 text-white p-2 w-full rounded-md font-semibold gap-x-2 hover:bg-slate-800 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-default"
                              disabled={
                                selectedAnswers.length !== quiz.questions.length
                              }
                            >
                              Finalizar
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleIncrementNextIndex();
                              }}
                              className="flex items-center justify-center text-center bg-slate-700 text-white p-2 w-full rounded-md font-semibold gap-x-2 hover:bg-slate-800 transition-colors duration-300 ease-in-out disabled:opacity-50"
                            >
                              Siguiente
                              <ChevronRightIcon className="w-5 h-5 text-white" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={handleDecreaseNextIndex}
                            disabled={nextIndex === 0}
                            className="flex justify-center flex-row-reverse items-center bg-gray-200 text-slate-700 p-2 rounded-md w-full font-semibold gap-x-2 hover:bg-gray-300 transition-colors duration-300 ease-in-out disabled:opacity-50"
                          >
                            Anterior
                            <ChevronLeftIcon className="w-5 h-5 text-slate-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <Text as="h2" category="body">
                No se encontró la información
              </Text>
            )}
          </form>
        </div>
      )}

      {showDialogConfirm && (
        <Modal isOpen={showDialogConfirm} onClose={handleHideConfirm}>
          <Text as="h2" category="subtitle" className="text-center">
            ¿Quieres enviar tus respuestas?
          </Text>

          <div className="flex flex-col md:flex-row w-full gap-x-4 mt-4">
            <button
              type="submit"
              onClick={() => {
                handleSubmit(onSubmit)();
                setShowDialogConfirm(false);
              }}
              className="p-2 bg-slate-700 rounded-md text-white w-full hover:bg-slate-800"
            >
              Sí, estoy seguro
            </button>
            <button
              onClick={handleHideConfirm}
              className="p-2 bg-gray-300 rounded-md text-black w-full hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
