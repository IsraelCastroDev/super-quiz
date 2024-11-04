import { CreateQuiz } from "@/types";
import { ErrorMessage, Text } from "@components/ui";
import { InputField, Label } from "@components/ui/Form";
import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  register: UseFormRegister<CreateQuiz>;
  questionsFields: FieldArrayWithId<CreateQuiz, "questions", "id">[];
  appendQuestion: UseFieldArrayAppend<CreateQuiz, "questions">;
  removeQuestion: UseFieldArrayRemove;
  errors: FieldErrors<CreateQuiz>;
  watchQuestions: CreateQuiz["questions"];
}

export function QuestionInput({
  register,
  questionsFields,
  appendQuestion,
  removeQuestion,
  errors,
  watchQuestions,
}: Props) {
  return (
    <div>
      <Label text="Ingresa las preguntas (min.5 - max. 20):" />

      <div className="space-y-3 mt-2">
        {questionsFields &&
          questionsFields.map((question, indexQuestion) => (
            <div
              key={indexQuestion}
              className="border border-slate-700 rounded-md p-4"
            >
              <div className="flex items-center justify-between">
                <Text as="p" category="body" className="font-semibold">
                  Pregunta {indexQuestion + 1}
                </Text>

                {questionsFields.length > 5 && questionsFields.length <= 20 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(indexQuestion)}
                    className="bg-red-500 text-white p-2 mt-3 rounded-md hover:bg-red-600"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                )}
              </div>

              <div className="mt-2">
                <textarea
                  id={`question-answers${indexQuestion}`}
                  placeholder="Ingrese la pregunta"
                  className="w-full outline-none border border-slate-700 rounded-md px-3 py-2 h-20 resize-none"
                  {...register(`questions.${indexQuestion}.title`, {
                    required: {
                      value: true,
                      message: "La pregunta es requerida",
                    },
                    minLength: {
                      value: 10,
                      message: "La pregunta debe tener al menos 10 caracteres",
                    },
                  })}
                />
                {errors.questions?.[indexQuestion]?.title && (
                  <ErrorMessage>
                    {errors.questions[indexQuestion].title.message}
                  </ErrorMessage>
                )}

                <div className="space-y-3">
                  {question.answers.map((_, indexAnswer) => {
                    const isCorrect =
                      watchQuestions[indexQuestion]?.answers[indexAnswer]
                        .is_correct;

                    const hasCorrectAnswer = watchQuestions[
                      indexQuestion
                    ].answers.some((a) => a.is_correct);

                    return (
                      <div
                        key={`answer-${indexAnswer}`}
                        className="flex items-center justify-between w-full gap-x-2"
                      >
                        <div className="w-full">
                          <InputField
                            id={`questions.${indexQuestion}.answers.${indexAnswer}.title`}
                            placeholder={`Respuesta ${indexAnswer + 1}`}
                            register={register(
                              `questions.${indexQuestion}.answers.${indexAnswer}.title`,
                              {
                                required: {
                                  value: true,
                                  message: "La respuesta es requerida",
                                },
                              }
                            )}
                            borderStyle={isCorrect ? "green" : "slate"}
                          />
                          {errors.questions?.[indexQuestion]?.answers?.[
                            indexAnswer
                          ]?.title && (
                            <ErrorMessage>
                              {
                                errors.questions[indexQuestion].answers[
                                  indexAnswer
                                ].title.message
                              }
                            </ErrorMessage>
                          )}
                          {errors.questions?.[indexQuestion]?.answers?.[
                            indexAnswer
                          ]?.is_correct && (
                            <ErrorMessage>
                              {
                                errors.questions[indexQuestion].answers[
                                  indexAnswer
                                ].is_correct.message
                              }
                            </ErrorMessage>
                          )}
                        </div>
                        <div>
                          <input
                            id={`answer-${indexQuestion}-${indexAnswer}`}
                            type="checkbox"
                            {...register(
                              `questions.${indexQuestion}.answers.${indexAnswer}.is_correct`,
                              {
                                required: {
                                  value: isCorrect ? true : false,
                                  message: "Elige la respuesta correcta",
                                },
                              }
                            )}
                            hidden
                          />
                          {(!hasCorrectAnswer || isCorrect) && (
                            <label
                              htmlFor={`answer-${indexQuestion}-${indexAnswer}`}
                              className="cursor-pointer"
                            >
                              <CheckCircleIcon
                                className={`h-6 w-6 ${
                                  isCorrect ? "text-green-400" : ""
                                }`}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>

      {questionsFields.length < 20 && (
        <div>
          <button
            type="button"
            onClick={() =>
              appendQuestion({
                title: "",
                answers: Array.from({ length: 5 }, () => ({
                  is_correct: false,
                  title: "",
                })),
              })
            }
            className="bg-slate-700 text-white p-2 mt-3 rounded-md"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
