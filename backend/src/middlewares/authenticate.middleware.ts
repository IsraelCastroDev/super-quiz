import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authToken } = req.cookies;

  if (!authToken) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findOne({ _id: decoded.id });

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
