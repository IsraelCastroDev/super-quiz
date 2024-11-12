import { getAnswers } from "@/api/quizAPI";
import { Loader } from "@/components/ui";
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

  if (isLoading) return <Loader />;

  return answers ? (
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
  );
}
