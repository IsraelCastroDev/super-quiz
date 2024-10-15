import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { access_token } = req.cookies;

  if (!access_token) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET!);

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
    res.status(500).json({ message: "No estás autenticado" });
    return;
  }

  next();
}
