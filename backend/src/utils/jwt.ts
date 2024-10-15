import jwt from "jsonwebtoken";
import { UserType } from "../models/User";

interface UserPayload {
  id: UserType["id"];
}

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1 day",
  });

  return token;
};
