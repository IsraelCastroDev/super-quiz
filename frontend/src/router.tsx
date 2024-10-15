import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeLayout from "./layouts/HomeLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import SendEmailRecoverPasswordPage from "./pages/auth/SendEmailRecoverPasswordPage";
import Notification from "./components/ui/Notification";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ConfirmAccountPage from "./pages/auth/ConfirmAccountPage";
import PlainLayout from "./layouts/PlainLayout";
import CreateQuizPage from "./pages/quiz/CreateQuizPage";
import { useAppPersists } from "./store/useAppPersists";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const userAuth = useAppPersists((state) => state.userAuth);

  return (
    <>
      <BrowserRouter>
        <Notification />
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} index />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/registrarse" element={<RegisterPage />} />
            <Route
              path="/quiz/crear"
              element={
                <ProtectedRoute isAllowed={!!userAuth}>
                  <CreateQuizPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<PlainLayout />}>
            <Route path="/confirmar-cuenta" element={<ConfirmAccountPage />} />
            <Route
              path="/recuperar-cuenta"
              element={<SendEmailRecoverPasswordPage />}
            />
            <Route
              path="/recuperar-cuenta/cambiar-password"
              element={<ResetPasswordPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
