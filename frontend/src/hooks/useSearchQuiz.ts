import { checkQuizExists } from "@/api/quizAPI";
import { useAppStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSearchQuiz() {
  const addNotification = useAppStore((state) => state.addNotification);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuizCode, setSearchQuizCode] = useState<string | undefined>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Consulta con `useQuery`
  const { data, isLoading } = useQuery({
    queryKey: ["search-quiz", searchQuizCode],
    queryFn: () => checkQuizExists(searchQuizCode),
    enabled: Boolean(searchQuizCode), // Se activa cuando `searchQuizCode` tiene valor
    retry: 0,
  });

  // Manejo de la redirección y notificaciones
  useEffect(() => {
    if (data?.exists) {
      addNotification({ title: "Token válido", type: "success" });
      navigate(`/quiz/${data.quiz}`);
      setSearchQuizCode(""); // Limpiar el código después de redirigir
    } else if (data && !data.exists) {
      addNotification({ title: "Token no válido", type: "error" });
      setSearchQuizCode(""); // Limpiar el código si no es válido
    }
  }, [data, addNotification, navigate]);

  // Funciones para abrir/cerrar el modal y buscar el quiz
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

    setSearchQuizCode(quizCode); // Esto inicia la consulta
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
