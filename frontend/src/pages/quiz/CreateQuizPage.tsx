import { Text } from "@/components/ui";
import { ContainerForm } from "@/components/ui/Form";
import { useCategoriesQuiz } from "@/hooks/useCreateQuiz";
import { CreateQuizForm } from "@/components/CreateQuiz";

export function CreateQuizPage() {
  const { data: categories, isPending } = useCategoriesQuiz();

  return (
    <>
      <div>
        <Text as="h1" category="title" className="text-center">
          Crear Super Quiz
        </Text>
      </div>

      <ContainerForm>
        <Text as="h2" category="subtitle">
          Ingresa los datos necesarios
        </Text>
        <CreateQuizForm categories={categories} isPending={isPending} />
      </ContainerForm>
    </>
  );
}
