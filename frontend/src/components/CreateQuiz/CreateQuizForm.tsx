import { ButtonSubmit, Form, InputField } from "@components/ui/Form";
import { Category, CreateQuiz } from "@/types";
import {
  useValidateCreateQuestionForm,
  useSelectedCategory,
  useCreateQuiz,
} from "@/hooks";
import { SelectedCategoriesForm } from "./SelectedCategoriesForm";
import { QuestionInput } from "./QuestionInput";

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
    questionsFields,
    appendQuestion,
    removeQuestion,
  } = useValidateCreateQuestionForm();

  const watchQuestions = watch("questions");

  const { mutate, quizCreateLoading } = useCreateQuiz();

  const onSubmit = (formData: CreateQuiz) => {
    mutate(formData);
    reset();
  };

  return (
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

      <ButtonSubmit isPending={quizCreateLoading} messageLoading="Creando...">
        Crear Quiz
      </ButtonSubmit>
    </Form>
  );
}
