import { Router } from "express";
import { QuizController } from "../controllers/QuizController";
import { authenticate } from "../middlewares/authenticate.middleware";
import { body } from "express-validator";
import { QuestionType } from "../models/Question";
import { CategoryType } from "../models/Category";

const router = Router();

router.post(
  "/create-quiz",
  authenticate,
  body("title")
    .notEmpty()
    .withMessage("El titúlo es requerido")
    .isString()
    .withMessage("El titúlo debe ser una cadena de texto"),
  body("categories")
    .notEmpty()
    .withMessage("Las categorías son requeridas")
    .isArray()
    .withMessage("Las categorías deben ser un arreglo")
    .custom((value) => {
      value.forEach((category: CategoryType) => {
        if (typeof category.name !== "string") {
          throw new Error("Cada categoría debe ser una cadena de texto");
        }
      });
      return true;
    }),
  body("questions")
    .notEmpty()
    .withMessage("Las preguntas son requeridas")
    .isArray()
    .withMessage("Las preguntas deben ser un arreglo")
    .isLength({ min: 5, max: 20 })
    .withMessage("El quiz debe tener entre 5 y 20 preguntas")
    .custom((values) => {
      values.forEach((question: QuestionType) => {
        if (
          typeof question !== "object" ||
          !question.name ||
          typeof question.name !== "string" ||
          typeof question.is_correct !== "boolean"
        ) {
          throw new Error(
            "Cada pregunta debe ser un objeto con propiedades 'name' (string) e 'is_correct' (boolean)"
          );
        }
      });
      return true;
    }),
  QuizController.createQuiz
);

export default router;