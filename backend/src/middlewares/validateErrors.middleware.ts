import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export async function validateErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array().map((error) => ({
        error: error.msg,
      })),
    });
    return;
  }

  next();
}
