import { Answers } from "@/components/quiz/QuizGame";
import { Loader, Modal, ProgressBar, Text } from "@/components/ui";
import { ButtonModal } from "@/components/ui/Modal";
import { useQuizGame } from "@/hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ClockIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";

export function QuizGame() {
  const { quizId } = useParams<{ quizId: string }>();

  const {
    quiz,
    isLoading,
    nextIndex,
    minutes,
    seconds,
    progressValue,
    selectedAnswers,
    handleAnswerChange,
    handleShowDialogConfirm,
    handleHideDialogGameOver,
    handleDecreaseNextIndex,
    handleIncrementNextIndex,
    showDialogConfirm,
    handleHideConfirm,
    handleSubmit,
    onSubmit,
    setShowDialogConfirm,
    handleReloadData,
    showDialogGameOver,
  } = useQuizGame(quizId);

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
                        <div key={question._id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Text as="h2" category="title">
                              Pregunta {index + 1} de {quiz.questions.length}
                            </Text>

                            <div className="flex items-center gap-x-1">
                              <ClockIcon className="w-6 h-6 text-slate-700" />
                              <Text as="p" category="subtitle">
                                {minutes.toString().padStart(2, "0")}:
                                {seconds.toString().padStart(2, "0")}
                              </Text>
                            </div>
                          </div>

                          <ProgressBar
                            value={progressValue}
                            className="bg-gray-300"
                          />

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
            <ButtonModal
              type="button"
              onClick={() => {
                handleSubmit(onSubmit)();
                setShowDialogConfirm(false);
              }}
              color="slate"
            >
              Sí, estoy seguro
            </ButtonModal>
            <ButtonModal type="button" onClick={handleHideConfirm} color="gray">
              Cancelar
            </ButtonModal>
          </div>
        </Modal>
      )}

      {showDialogGameOver && (
        <Modal
          isOpen={showDialogGameOver}
          onClose={handleHideDialogGameOver}
          showCloseIcon={false}
        >
          <Text as="h2" category="title" className="text-center">
            ¡ Se te ha agotado el tiempo!
          </Text>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-4">
            <ButtonModal type="button" onClick={handleReloadData} color="slate">
              Intentar otra vez
            </ButtonModal>

            <Link
              to={`/quiz/${quizId}`}
              onClick={handleHideDialogGameOver}
              className="p-2 bg-gray-300 rounded-md text-black text-center w-full hover:bg-gray-400"
            >
              Volver
            </Link>
          </div>
        </Modal>
      )}
    </section>
  );
}
