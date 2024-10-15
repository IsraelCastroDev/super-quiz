import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeLayout from "./layouts/HomeLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import SendEmailRecoverPasswordPage from "./pages/auth/SendEmailRecoverPasswordPage";
import Notification from "./components/ui/Notification";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ConfirmAccount from "./pages/auth/ConfirmAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Notification />
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} index />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/registrarse" element={<RegisterPage />} />
          </Route>
          <Route path="/confirmar-cuenta" element={<ConfirmAccount />} />
          <Route
            path="/recuperar-cuenta"
            element={<SendEmailRecoverPasswordPage />}
          />
          <Route
            path="/recuperar-cuenta/cambiar-password"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
