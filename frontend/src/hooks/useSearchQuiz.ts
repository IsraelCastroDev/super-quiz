import { getQuizByToken } from "@/api/quizAPI";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSearchQuiz() {
  const addNotification = useAppStore((state) => state.addNotification);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [searchQuizCode, setSearchQuizCode] = useState<string | undefined>("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (quizError && searchTriggered) {
      addNotification({ title: quizError.message, type: "error" });
      setSearchTriggered(false);
      setSearchQuizCode("");
    }
  }, [quizError, searchTriggered, addNotification]);

  useEffect(() => {
    if (data && searchTriggered) {
      navigate(`/quiz/${data.title}`);
    }
  }, [data, navigate, searchTriggered]);

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

    setSearchQuizCode(quizCode);
    setSearchTriggered(true);
  };

  return {
    isModalOpen,
    data,
    error,
    isLoading,
    searchQuizCode,
    handleOpenModal,
    handleCloseModal,
    handleSearchQuiz,
  };
}
