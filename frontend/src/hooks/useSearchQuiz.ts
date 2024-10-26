import { getQuizByToken } from "@/api/quizAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useSearchQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [searchQuizCode, setSearchQuizCode] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["search-quiz"],
    queryFn: () => getQuizByToken(searchQuizCode),
    enabled: searchTriggered,
    retry: 0,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSearchQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTriggered(true);
    setTimeout(() => setIsModalOpen(false), 1000);
  };

  return {
    isModalOpen,
    setSearchQuizCode,
    data,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    handleSearchQuiz,
  };
}
