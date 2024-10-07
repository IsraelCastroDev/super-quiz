import { transporter } from "../../config/nodemailer";

interface IEmail {
  name: string;
  email: string;
  token: string;
}

export async function sendConfirmEmail(user: IEmail) {
  const info = await transporter.sendMail({
    from: "Super Trivia <admin@superquiz.com>",
    to: user.email,
    subject: "Super Quiz - Confirma tu cuenta",
    text: "Confirma tu cuenta en Super Quiz",
    html: `<p>Hola ${user.name}, solo estás a un paso de divertirte en Super Quiz, confirma tu cuenta</p>
          <p>Visita el siguiente enlace:</>
          <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta">Confirmar Cuenta</a>
          <p>E ingresa el siguiente código: <b>${user.token}</b></p>
          <p>Este token expira en aproximadamente 2 horas</>
    `,
  });
  console.log(`Mensaje enviado ${info.messageId}`);
}

export async function sendResetPasswordEmail(user: IEmail) {
  const info = await transporter.sendMail({
    from: "Super Trivia <admin@superquiz.com>",
    to: user.email,
    subject: "Super Quiz - Recupera tu contraseña",
    text: "Recupera tu contraseña en Super Quiz",
    html: `<p>Hola ${user.name}, solo estás a un paso de recuparar tu contraseña en Super Quiz</p>
          <p>Visita el siguiente enlace:</>
          <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta">Confirmar Cuenta</a>
          <p>E ingresa el siguiente código: <b>${user.token}</b></p>
          <p>Este token expira en aproximadamente 2 horas</>
    `,
  });
  console.log(`Mensaje enviado ${info.messageId}`);
}
