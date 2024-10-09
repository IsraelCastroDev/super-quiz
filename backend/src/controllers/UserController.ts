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

      res.status(201).json({ message: "Cuenta creada con exito" });
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

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Inicio de sesion exitoso" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al iniciar sesion" });
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
      const { password } = req.body;
      const { token } = req.params;

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
}
