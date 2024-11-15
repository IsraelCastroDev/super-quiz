export type SubmitQuizData = {
  quizId: string;
  answers: {
    answerId: string;
    questionId: string;
  }[];
};
