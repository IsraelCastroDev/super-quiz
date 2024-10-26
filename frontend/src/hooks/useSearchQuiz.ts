import { getQuizByToken } from "@/api/quizAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useSearchQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [searchQuizCode, setsearchQuizCode] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    isLoading,
    error: quizError,
  } = useQuery({
    queryKey: ["search-quiz"],
    queryFn: () => getQuizByToken(searchQuizCode),
    enabled: searchTriggered,
    retry: 0,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSearchQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const quizCode = formData.get("quizCode") as string;

    if (quizCode.trim() === "") {
      setError("Código requerido");
      setTimeout(() => setError(null), 2000);
      return;
    }

    setsearchQuizCode(quizCode);
    setSearchTriggered(true);
    setTimeout(() => setIsModalOpen(false), 1000);
  };

  return {
    isModalOpen,
    data,
    error,
    quizError,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    handleSearchQuiz,
  };
}
