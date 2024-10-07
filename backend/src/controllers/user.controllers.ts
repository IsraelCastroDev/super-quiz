import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { comparePassword, hashPassword } from "../utils/user";
import { generateToken } from "../utils/token";
import { sendConfirmEmail } from "../services/mail/mail";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, lastname, username, email, password, role } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    let roleToAssign = role || "user";

    if (email === "israelcastro1007@gmail.com") {
      roleToAssign = "super";
    }

    const roleRecord = await prisma.role.findFirst({
      where: {
        name: roleToAssign,
      },
    });

    if (!roleRecord) {
      res.status(400).json({ message: "El rol no existe" });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        lastname,
        username,
        email,
        password: hashedPassword,
        role_id: roleRecord.id,
      },
    });

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    const token = await prisma.token.create({
      data: {
        token: generateToken(),
        user_id: newUser.id,
        expired_at: expirationDate,
      },
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

export const confirmAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const tokenExists = await prisma.token.findFirst({
      where: {
        token,
      },
    });

    if (!tokenExists) {
      res.status(400).json({ message: "Token no existe o es inválido" });
      return;
    }

    const currentDate = new Date();
    if (tokenExists.expired_at < currentDate) {
      res.status(400).json({ message: "Token expirado" });
      return;
    }

    await prisma.user.update({
      where: {
        id: tokenExists.user_id,
      },
      data: {
        confirm: true,
      },
    });

    await prisma.token.delete({
      where: {
        id: tokenExists.id,
      },
    });

    res.status(200).json({ message: "Cuenta confirmada con exito" });
    return;
  } catch (error) {
    console.log("error al confirmar la cuenta", error);
    res.status(500).json({ message: "Error al confirmar la cuenta" });
    return;
  }
};

export const requestNewConfirmationToken = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "El usuario no existe" });
      return;
    }

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    const token = await prisma.token.create({
      data: {
        token: generateToken(),
        user_id: user.id,
        expired_at: expirationDate,
      },
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

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

    const token = generateJWT({ id: userExists.id });

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al iniciar sesion" });
    return;
  }
};
