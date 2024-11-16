import { brevo } from "../../config/brevoMail";
import { apiInstance } from "../../config/brevoMail";

interface IEmail {
  name: string;
  email: string;
  token: string;
}

export async function sendConfirmEmail(user: IEmail) {
  try {
    const sendSmtEmail = new brevo.SendSmtpEmail();

    sendSmtEmail.subject = "Confirma tu cuenta - Super Quiz";

    sendSmtEmail.to = [{ email: user.email, name: user.name }];

    sendSmtEmail.htmlContent = `<h1 style="border-bottom: 1px solid black;">Confirma tu cuenta en Super Quiz</h1><p>Hola ${user.name}, solo estás a un paso de divertirte en Super Quiz, confirma tu cuenta</p><p>Visita el siguiente enlace: </p><a href="${process.env.FRONTEND_URL}/confirmar-cuenta">Confirmar Cuenta</a><p>E ingresa el siguiente código: <b>${user.token}</b></p><p>Este token expira en aproximadamente 2 horas</>`;

    sendSmtEmail.sender = {
      email: "israelcastro1007@gmail.com",
      name: "Israel Castro - Super Quiz",
    };

    const result = await apiInstance.sendTransacEmail(sendSmtEmail);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export async function sendResetPasswordEmail(user: IEmail) {
  try {
    const sendSmtEmail = new brevo.SendSmtpEmail();

    sendSmtEmail.subject = "Super Quiz - Cambio de contraseña";

    sendSmtEmail.to = [{ email: user.email, name: user.name }];

    sendSmtEmail.htmlContent = `<p>Hola ${user.name}, solo estás a un paso de recuparar tu contraseña en Super Quiz</p><p>Visita el siguiente enlace:</><a href="${process.env.FRONTEND_URL}/recuperar-cuenta cambiar-password">Cambiar contraseña</a><p>E ingresa el siguiente código: <b>${user.token}</b></p><p>Este token expira en aproximadamente 2 horas</>
    `;

    sendSmtEmail.sender = {
      email: "israelcastro1007@gmail.com",
      name: "Super Quiz - Israel Castro",
    };

    const result = await apiInstance.sendTransacEmail(sendSmtEmail);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
