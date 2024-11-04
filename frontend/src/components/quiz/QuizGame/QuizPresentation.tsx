import { ButtonQuiz, Badge, BadgeGroup, StatCard } from "@/components/quiz/ui";
import { Card, CardContent, Text } from "@/components/ui";
import { Quiz, QuizCategory } from "@/schemas";
import {
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

interface Props {
  handleShowQuiz: () => void;
  quiz: Quiz | undefined;
  categories: (QuizCategory | undefined)[] | undefined;
}

export function QuizPresentation({ handleShowQuiz, quiz, categories }: Props) {
  return (
    <div className="p-8 flex flex-col items-center justify-center relative">
      <div className="relative z-10 w-full max-w-4xl">
        <Text as="h1" category="big" className="text-center">
          Super Quiz
        </Text>
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
                <StatCard text="15 minutos" IconComponent={ClockIcon} />
                <StatCard text="100 puntos" IconComponent={TrophyIcon} />
                <StatCard text="1000+ jugadors" IconComponent={UsersIcon} />
              </div>

              <ButtonQuiz handleShowQuiz={handleShowQuiz} />
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
                {[1, 2, 3].map((index) => (
                  <li
                    key={index}
                    className="bg-slate-100 p-3 rounded-lg shadow-sm border border-slate-200"
                  >
                    <p className="text-slate-700 flex items-center">
                      <StarIcon className="text-slate-500 mr-2 mt-1 w-6 h-6" />
                      <span>
                        {index}. Pregunta de ejemplo {index}
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
                  <ChartBarIcon className="text-slate-600 mr-2 h-6 w-6" />
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
                  <StarIcon className="text-slate-600 mr-2 h-6 w-6" />
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
                  <TrophyIcon className="text-slate-600 mr-2 h-6 w-6" />
                  <span className="font-semibold text-slate-700">
                    Completados
                  </span>
                </div>
                <span className="text-slate-700 font-bold">5,234</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
