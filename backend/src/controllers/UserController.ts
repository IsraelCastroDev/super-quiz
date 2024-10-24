import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/user";
import { generateToken } from "../utils/token";
import {
  sendConfirmEmail,
  sendResetPasswordEmail,
} from "../services/mail/mail";
import { generateJWT } from "../utils/jwt";
import User from "../models/User";
import Role from "../models/Role";
import Token from "../models/Token";

export class UserController {
  // Create Account
  static createAccount = async (req: Request, res: Response) => {
    const { name, lastname, username, email, password, role } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ message: "El usuario ya existe" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      let roleToAssign = role || "user";

      if (email === "israelcastro1007@gmail.com") {
        roleToAssign = "super";
      }

      const roleRecord = await Role.findOne({ name: roleToAssign });

      if (!roleRecord) {
        res.status(400).json({ message: "El rol no existe" });
        return;
      }

      const newUser = await User.create({
        name,
        lastname,
        username,
        email,
        password: hashedPassword,
        role: roleRecord.id,
      });

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);

      const token = await Token.create({
        token: generateToken(),
        user: newUser.id,
        expired_at: expirationDate,
      });

      await sendConfirmEmail({
        name: newUser.name,
        email: newUser.email,
        token: token.token,
      });

      res
        .status(201)
        .json({ message: "Cuenta creada con exito, confirma tu cuenta" });
      return;
    } catch (error) {
      console.log("error al crear la cuenta", error);
      res.status(500).json({ message: "Error al crear la cuenta" });
      return;
    }
  };

  // Request New Confirmation Token
  static requestNewConfirmationToken = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);

      const token = await Token.create({
        token: generateToken(),
        user: user._id,
        expired_at: expirationDate,
      });

      await sendConfirmEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      res.status(200).json({ message: "Token enviado con exito" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al solicitar el token" });
      return;
    }
  };

  // Confirm Account
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        res.status(400).json({ message: "Token no existe o es inválido" });
        return;
      }

      const currentDate = new Date();
      if (tokenExists.expired_at < currentDate) {
        res.status(400).json({ message: "Token expirado" });
        return;
      }

      await User.updateOne({ _id: tokenExists.user._id }, { confirm: true });

      await Token.deleteOne({ token: tokenExists.token });

      res.status(200).json({ message: "Cuenta confirmada con exito" });
      return;
    } catch (error) {
      console.log("error al confirmar la cuenta", error);
      res.status(500).json({ message: "Error al confirmar la cuenta" });
      return;
    }
  };

  // Login
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (!userExists) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      if (!userExists.confirm) {
        res.status(400).json({ message: "Esta cuenta no ha sido confirmada" });
        return;
      }

      const isCorrectPassword = await comparePassword(
        password,
        userExists.password
      );

      if (!isCorrectPassword) {
        res.status(400).json({ message: "La contraseña es incorrecta" });
        return;
      }

      const token = generateJWT({ id: userExists._id });
      const user = {
        name: userExists.name,
        lastname: userExists.lastname,
        username: userExists.username,
      };

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json({ message: "Inicio de sesion exitoso", user });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al iniciar sesion" });
      return;
    }
  };

  static logout = async (req: Request, res: Response) => {
    try {
      const { access_token } = req.cookies;

      if (!access_token) {
        res.status(400).json({ message: "Sesion no iniciada" });
        return;
      }

      res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Sesion cerrada" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error al cerrar sesión" });
      return;
    }
  };

  // Validate Token
  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        res.status(400).json({ message: "Token no existe" });
        return;
      }

      // validar si el token ya ha expirado
      const currentDate = new Date();
      if (tokenExists.expired_at < currentDate) {
        res.status(400).json({ message: "Token expirado" });
        return;
      }

      res.status(200).json({ message: "Token correcto" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error al validar el token" });
      return;
    }
  };

  // Request Token To Recover Password
  static requestTokenToRecoverPassword = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      if (!user.confirm) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 2);

        const token = await Token.create({
          token: generateToken(),
          user: user._id,
          expired_at: expirationDate,
        });

        await sendConfirmEmail({
          name: user.name,
          email: user.email,
          token: token.token,
        });
        res.status(400).json({
          message:
            "Esta cuenta no ha sido confirmada, te acabamos de enviar un email de confirmación",
        });
        return;
      }

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 2);

      const token = await Token.create({
        token: generateToken(),
        user: user._id,
        expired_at: expirationDate,
      });

      await sendResetPasswordEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      res.status(200).json({ message: "Token enviado con exito" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error al solicitar el token" });
      return;
    }
  };

  // Reset Password
  static resetPassword = async (req: Request, res: Response) => {
    try {
      const { password, token } = req.body;

      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        res.status(400).json({ message: "El token no existe" });
        return;
      }

      if (tokenExists.expired_at < new Date()) {
        res.status(400).json({ message: "El token ha expirado" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      await User.updateOne(
        { _id: tokenExists.user._id },
        { password: hashedPassword }
      );

      await Token.deleteOne({ token: tokenExists.token });

      res.status(200).json({ message: "Contraseña cambiada con exito" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al resetear la contraseña" });
      return;
    }
  };

  // verify auth
  static verifyAuth = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ email: req.userEmail });

      if (!user) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      res.status(200).json({ message: "Usuario autenticado" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error al verificar la autenticación" });
      return;
    }
  };

  // User Profile
  static userProfile = async (req: Request, res: Response) => {
    try {
      const userExists = await User.findOne({ email: req.userEmail });

      if (!userExists) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json({
        name: userExists.name,
        lastname: userExists.lastname,
        username: userExists.username,
        email: userExists.email,
        created_at: userExists.createdAt,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los datos." });
    }
  };
}
