import { createQuiz, getQuizCategories } from "@/api/quizAPI";
import { useAppStore } from "@/store";
import { Category, CategorySelectedForm, CreateQuiz } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export function useCategoriesQuiz() {
  const queryCategoriesQuiz = useQuery({
    queryKey: ["categoriesQuiz"],
    queryFn: getQuizCategories,
  });

  return queryCategoriesQuiz;
}

export function useSelectedCategory() {
  const [selectedCategories, setSelectedCategories] = useState<
    CategorySelectedForm[]
  >([]);

  const handleSelectedCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    const isChecked = e.target.checked;

    if (isChecked && selectedCategories.length >= 3) return;

    if (isChecked) {
      setSelectedCategories((prev) => [
        ...prev,
        { name: category.name, selected: isChecked },
      ]);
    } else {
      const newSelectedCategories = selectedCategories.filter(
        (currentCategory) => currentCategory.name !== category.name
      );

      setSelectedCategories(newSelectedCategories);
    }
  };

  const handleDelete = (nameCategory: Category["name"]) => {
    const newSelectedCategories = selectedCategories.filter(
      (category) => category.name !== nameCategory
    );
    setSelectedCategories(newSelectedCategories);
  };

  const isCategorySelected = (nameCategory: Category["name"]) => {
    return selectedCategories.some(
      (category) => category.name === nameCategory
    );
  };

  return {
    selectedCategories,
    handleSelectedCategory,
    handleDelete,
    isCategorySelected,
  };
}

export function useValidateCreateQuestionForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateQuiz>({
    defaultValues: {
      title: "",
      categories: [],
      questions: Array.from({ length: 5 }, () => ({
        title: "",
        answers: Array.from({ length: 5 }, () => ({
          title: "",
          is_correct: false,
        })),
      })),
    },
  });

  const {
    fields: questionsFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({ control, name: "questions" });

  return {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    questionsFields,
    appendQuestion,
    removeQuestion,
  };
}

export function useCreateQuiz() {
  const addNotification = useAppStore((state) => state.addNotification);
  const [quizCode, setQuizCode] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { mutate, isPending: quizCreateLoading } = useMutation({
    mutationFn: createQuiz,
    onSuccess: (data) => {
      addNotification({
        title: "Quiz creado",
        type: "success",
      });
      setQuizCode(data.token);
      setOpenModal(true);
    },
    onError: (error) => {
      addNotification({
        title: error.message,
        type: "error",
      });
      setQuizCode(null);
      setOpenModal(false);
    },
  });

  return { mutate, quizCreateLoading, quizCode, openModal, setOpenModal };
}
