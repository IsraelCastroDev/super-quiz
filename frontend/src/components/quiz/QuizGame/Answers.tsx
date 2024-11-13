import { getAnswers } from "@/api/quizAPI";
import { Skeleton } from "@/components/ui";
import { Label } from "@/components/ui/Form";
import { useQuery } from "@tanstack/react-query";

interface Props {
  question: {
    _id: string;
    __v: number;
    title: string;
    quiz: string;
    answers: string[];
    createdAt: string;
    updatedAt: string;
  };
  selectedAnswer: string | undefined;
  onAnswerChange: (answerId: string) => void;
}

export function Answers({ question, selectedAnswer, onAnswerChange }: Props) {
  const { data: answers, isLoading } = useQuery({
    queryKey: ["answers", question._id],
    queryFn: () => getAnswers(question._id),
  });

  return (
    <>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="w-80 h-3 rounded-sm" />
          </div>
        ))
      ) : answers ? (
        <div>
          {answers.map((answer) => (
            <div key={answer._id} className="flex gap-x-2">
              <input
                type="radio"
                name="answer"
                id={`asnwer-${answer._id}`}
                checked={selectedAnswer === answer._id}
                onChange={() => onAnswerChange(answer._id)}
                value={selectedAnswer}
              />
              <Label text={answer.title} htmlFor={`asnwer-${answer._id}`} />
            </div>
          ))}
        </div>
      ) : (
        "No se encontraron respuestas"
      )}
    </>
  );
}
