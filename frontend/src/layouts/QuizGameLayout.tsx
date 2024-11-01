import { Outlet } from "react-router-dom";

export function QuizGameLayout() {
  return (
    <main className="my-5">
      <Outlet />
    </main>
  );
}
