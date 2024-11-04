interface Props {
  handleShowQuiz?: () => void;
}

export function ButtonQuiz({ handleShowQuiz }: Props) {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleShowQuiz}
        type="button"
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
      >
        Iniciar Quiz
      </button>
    </div>
  );
}
