import { ButtonQuiz, Badge, BadgeGroup, StatCard } from "@/components/quiz/ui";
import { Card, CardContent, Modal, Text } from "@/components/ui";
import { Quiz, QuizCategory } from "@/schemas";
import {
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface Props {
  handleShowQuiz: () => void;
  handleShowDialogConfirm: () => void;
  handleHideDialogConfirm: () => void;
  quiz: Quiz | undefined;
  categories: (QuizCategory | undefined)[] | undefined;
  showDialogConfirm: boolean;
}

export function QuizPresentation({
  handleShowQuiz,
  handleShowDialogConfirm,
  handleHideDialogConfirm,
  quiz,
  categories,
  showDialogConfirm,
}: Props) {
  return (
    <>
      <div className="p-8 flex flex-col items-center justify-center relative">
        <div className="relative z-10 w-full max-w-4xl">
          <Link to={"/"}>
            <Text as="h1" category="big" className="text-center">
              Super Quiz
            </Text>
          </Link>
        </div>

        <div className="w-full border border-slate-700 shadow-xl rounded-2xl overflow-hidden mt-5">
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 w-full">
                <Text
                  as="h2"
                  category="title"
                  className="border-b-2 border-slate-500 pb-2 w-full truncate"
                  title={quiz ? quiz.title : ""}
                >
                  {quiz ? quiz.title : "Título no encontrado"}
                </Text>

                <BadgeGroup>
                  {categories ? (
                    categories.map(
                      (categorie) =>
                        categorie && (
                          <Badge key={categorie._id} text={categorie.name} />
                        )
                    )
                  ) : (
                    <Text as="p" category="body">
                      No hay categorías
                    </Text>
                  )}
                </BadgeGroup>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <StatCard
                    text={`${quiz ? quiz.questions.length : "0"} preguntas`}
                    IconComponent={BookOpenIcon}
                  />
                  <StatCard
                    text={`${quiz ? `${quiz.duration} minutos` : "0 minutos"}`}
                    IconComponent={ClockIcon}
                  />
                  <StatCard
                    text={`${quiz ? quiz.questions.length * 100 : 0} puntos`}
                    IconComponent={TrophyIcon}
                  />
                  <StatCard text="1000+ jugadors" IconComponent={UsersIcon} />
                </div>

                <ButtonQuiz handleShowDialogConfirm={handleShowDialogConfirm} />
              </div>

              <div className="space-y-4">
                <Text
                  as="h2"
                  category="title"
                  className="border-b-2 border-slate-500 pb-2"
                >
                  Preguntas de muestra
                </Text>
                <ul className="space-y-2">
                  {quiz?.questions.slice(0, 2).map((q, index) => (
                    <li
                      key={q._id}
                      className="bg-slate-100 p-3 rounded-lg shadow-sm border border-slate-200"
                    >
                      <p className="text-slate-700 flex items-center">
                        <StarIcon className="text-slate-500 mr-2 mt-1 w-6 h-6" />
                        <span>
                          {index + 1}. {q.title}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent>
                  <div className="flex items-center">
                    <ChartBarIcon className="text-slate-600 mr-2 h- w-6" />
                    <span className="font-semibold text-slate-700">
                      Dificultad
                    </span>
                  </div>
                  <span className="text-slate-700 font-bold">Intermedio</span>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center">
                    <StarIcon className="text-slate-600 mr-2 h- w-6" />
                    <span className="font-semibold text-slate-700">
                      Calificación
                    </span>
                  </div>
                  <span className="text-slate-700 font-bold">4.8/5</span>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center">
                    <TrophyIcon className="text-slate-600 mr-2 h- w-6" />
                    <span className="font-semibold text-slate-700">
                      Completados
                    </span>
                  </div>
                  <span className="text-slate-700 font-bold">5,234</span>
                </CardContent>
              </Card>
            </div>
            <Text as="p" category="body" className="mt-4">
              Cada pregunta vale 100 puntos*
            </Text>
          </div>
        </div>
      </div>

      <Link
        to={"/"}
        className="text-center block hover:underline font-semibold text-slate-900"
      >
        Volver a inicio
      </Link>

      {showDialogConfirm && (
        <Modal isOpen={showDialogConfirm} onClose={handleHideDialogConfirm}>
          <Text as="h2" category="subtitle">
            ¿Quieres iniciar a responder el Super Quiz?
          </Text>

          <div className="flex items-center gap-x-3 mt-4">
            <button
              onClick={handleShowQuiz}
              className="p-2 bg-slate-700 rounded-md text-white w-full hover:bg-slate-800"
            >
              Sí, estoy seguro
            </button>
            <button
              onClick={handleHideDialogConfirm}
              className="p-2 bg-gray-300 rounded-md text-black w-full hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
