import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Verificando autenticación...");

  // Log de la cookie
  const { access_token } = req.cookies;
  console.log("Cookie recibida:", access_token);

  if (!access_token) {
    console.warn("No se encontró el token de acceso en las cookies.");
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  try {
    // Intento de decodificación del token JWT
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET!);
    console.log("Token decodificado:", decoded);

    if (typeof decoded === "object" && decoded.id) {
      console.log("ID de usuario encontrado en el token:", decoded.id);

      // Intento de buscar el usuario en la base de datos
      const user = await User.findOne({ _id: decoded.id });
      console.log("Usuario encontrado:", user);

      if (user) {
        req.userId = user.id;
        req.userEmail = user.email;
        console.log("Autenticación exitosa para el usuario:", user.email);
      } else {
        console.warn("No se encontró el usuario en la base de datos.");
        res.status(401).json({ message: "No autorizado" });
        return;
      }
    } else {
      console.warn("Token decodificado sin ID de usuario.");
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(401).json({ message: "No estás autenticado", error });
    return;
  }

  next();
}
