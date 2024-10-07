import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: User["id"];
}

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "2 days",
  });

  return token;
};
