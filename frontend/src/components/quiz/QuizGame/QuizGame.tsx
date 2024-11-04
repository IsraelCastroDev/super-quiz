import { Modal, Text } from "@/components/ui";

interface QuizGameProps {
  handleShowDialogConfirm: () => void;
  handleHideDialogConfirm: () => void;
  handleHideQuiz: () => void;
  showDialogConfirm: boolean;
}

export function QuizGame({
  handleShowDialogConfirm,
  handleHideDialogConfirm,
  handleHideQuiz,
  showDialogConfirm,
}: QuizGameProps) {
  return (
    <>
      <button
        type="button"
        onClick={handleShowDialogConfirm}
        className="absolute top-0 left-0 bg-slate-700 p-2 text-white rounded-md font-semibold"
      >
        volver
      </button>

      {showDialogConfirm && (
        <Modal isOpen={showDialogConfirm} onClose={handleHideDialogConfirm}>
          <Text as="h2" category="subtitle">
            ¿Quieres abandonar el Super Quiz?
          </Text>

          <div className="flex items-center gap-x-2 mt-4">
            <button
              onClick={handleHideQuiz}
              className="p-2 bg-slate-700 rounded-md text-white w-full hover:bg-slate-800"
            >
              Sí, quiero volver
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
