import { Request, Response } from "express";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions, category, difficulty } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el quiz" });
    return;
  }
};
