import { ButtonSubmit, Form, InputField, Label } from "@components/ui/Form";
import { Category, CreateQuiz } from "@/types";
import {
  useValidateCreateQuestionForm,
  useSelectedCategory,
  useCreateQuiz,
} from "@/hooks";
import { SelectedCategoriesForm } from "./SelectedCategoriesForm";
import { QuestionInput } from "./QuestionInput";
import { Modal } from "@components/ui";
import { QuizCode } from "./QuizCode";

interface Props {
  isPending: boolean;
  categories: Category[] | undefined;
}

export function CreateQuizForm({ categories, isPending }: Props) {
  const {
    selectedCategories,
    handleSelectedCategory,
    handleDelete,
    isCategorySelected,
  } = useSelectedCategory();

  const {
    register,
    watch,
    errors,
    handleSubmit,
    reset,
    setValue,
    questionsFields,
    appendQuestion,
    removeQuestion,
  } = useValidateCreateQuestionForm();

  const watchQuestions = watch("questions");
  const watchDuration = watch("duration");

  const { mutate, quizCreateLoading, quizCode, openModal, setOpenModal } =
    useCreateQuiz();

  const handleCloseModal = () => setOpenModal(false);

  const onSubmit = (formData: CreateQuiz) => {
    mutate(formData);
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/*Title */}
        <InputField
          id="title"
          label="Título de Super Quiz:"
          placeholder="Ingrese el título de quiz"
          register={register("title", {
            required: { value: true, message: "El título es requerido" },
            minLength: {
              value: 3,
              message: "El título debe tener al menos 3 caracteres",
            },
          })}
          error={errors.title}
        />

        {/*Seleccionar categorías */}
        <SelectedCategoriesForm
          isPending={isPending}
          categories={categories}
          handleSelectedCategory={handleSelectedCategory}
          selectedCategories={selectedCategories}
          handleDelete={handleDelete}
          register={register}
          isCategorySelected={isCategorySelected}
          errors={errors}
        />

        {/*Ingresar quizzes */}
        <QuestionInput
          questionsFields={questionsFields}
          appendQuestion={appendQuestion}
          errors={errors}
          removeQuestion={removeQuestion}
          watchQuestions={watchQuestions}
          register={register}
        />

        <div className="space-y-2 border">
          <Label text="Duración del Super Quiz (min. 15 - max 20 minutos)" />
          <div className="border border-slate-700 rounded-md p-4">
            <Label text={`${watchDuration} minutos`} htmlFor="duration" />
            <input
              type="range"
              id="duration"
              min={15}
              max={20}
              step={1}
              value={watchDuration}
              onChange={(e) => setValue("duration", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <ButtonSubmit isPending={quizCreateLoading} messageLoading="Creando...">
          Crear Quiz
        </ButtonSubmit>
      </Form>

      {openModal && quizCode && (
        <Modal
          title="Código del Super Quiz"
          isOpen={openModal}
          onClose={handleCloseModal}
        >
          <QuizCode quizCode={quizCode} />
        </Modal>
      )}
    </>
  );
}
