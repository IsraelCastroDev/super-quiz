import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import PlainLayout from "./layouts/PlainLayout";
import { useAppPersists } from "./store/useAppPersists";
import { useValidateAuth } from "./hooks/useAuthUser";
import { UserAuthData } from "./types";
import { useEffect } from "react";
import { useAppStore } from "./store/useAppStore";
import { Notification } from "./components/ui";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import {
  HomePage,
  ConfirmAccountPage,
  LoginPage,
  NotFoundPage,
  SendEmailRecoverPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  CategoryQuizPage,
  CreateQuizPage,
  ProfilePage,
} from "./pages";

function App() {
  const userAuth = useAppPersists((state) => state.userAuth);
  const setUserAuth = useAppPersists((state) => state.setUserAuth);

  return (
    <>
      <BrowserRouter>
        <AuthHandler setUserAuth={setUserAuth} />
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
            <Route
              path="/quizzes/category/:slug"
              element={<CategoryQuizPage />}
            />
            <Route path="/perfil" element={<ProfilePage />} />
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

function AuthHandler({
  setUserAuth,
}: {
  setUserAuth: (userAuth: UserAuthData | null) => void;
}) {
  const { data: userAuth, error } = useValidateAuth();
  const addNotification = useAppStore((state) => state.addNotification);

  useEffect(() => {
    if (error) {
      setUserAuth(null);
    }
  }, [setUserAuth, userAuth, error, addNotification]);

  return null;
}
