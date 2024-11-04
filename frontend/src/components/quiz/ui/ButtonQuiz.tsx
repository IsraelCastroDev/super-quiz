interface Props {
  handleShowDialogConfirm: () => void;
}

export function ButtonQuiz({ handleShowDialogConfirm }: Props) {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleShowDialogConfirm}
        type="button"
        className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
      >
        Iniciar Quiz
      </button>
    </div>
  );
}
