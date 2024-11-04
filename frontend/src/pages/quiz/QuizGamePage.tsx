import { useEffect } from "react";

export function QuizGame() {
  useEffect(() => {
    const handleBeforeUnLoad = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnLoad);

    return () => window.removeEventListener("beforeunload", handleBeforeUnLoad);
  }, []);

  return (
    <>
      <h2>quiz game</h2>
    </>
  );
}
