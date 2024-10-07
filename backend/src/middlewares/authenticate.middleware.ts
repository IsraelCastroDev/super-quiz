import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "object" && decoded.id) {
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (user) {
        req.userId = user.id;
        req.userEmail = user.email;
      } else {
        res.status(401).json({ message: "No autorizado" });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al autenticar" });
    return;
  }

  next();
}
