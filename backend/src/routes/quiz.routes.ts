import { Router } from "express";
import { QuizController } from "../controllers/QuizController";
import { authenticate } from "../middlewares/authenticate.middleware";
import { body, param } from "express-validator";
import { validateErrors } from "../middlewares/validateErrors.middleware";
import { QuestionType } from "../models/Question";

const router = Router();

router.post(
  "/create-quiz",
  authenticate,
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isString()
    .withMessage("El título debe ser una cadena de texto"),
  body("categories")
    .notEmpty()
    .withMessage("Las categorías son requeridas")
    .isArray()
    .withMessage("Las categorías deben ser un arreglo")
    .custom((value) => {
      value.forEach((category: string) => {
        if (typeof category !== "string") {
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
    .custom((questions) => {
      questions.forEach((question: QuestionType) => {
        if (
          typeof question !== "object" ||
          !question.title ||
          typeof question.title !== "string"
        ) {
          throw new Error(
            "Cada pregunta debe ser un objeto con la propiedad 'title' (string)"
          );
        }

        if (!question.answers || !Array.isArray(question.answers)) {
          throw new Error(
            "Cada pregunta debe contener un arreglo de respuestas"
          );
        }

        if (question.answers.length !== 5) {
          throw new Error("Cada pregunta debe tener exactamente 5 respuestas");
        }

        question.answers.forEach((answer: any) => {
          if (
            typeof answer !== "object" ||
            !answer.name ||
            typeof answer.name !== "string" ||
            typeof answer.is_correct !== "boolean"
          ) {
            throw new Error(
              "Cada respuesta debe ser un objeto con las propiedades 'name' (string) e 'is_correct' (boolean)"
            );
          }
        });
      });

      return true;
    }),
  validateErrors,
  QuizController.createQuiz
);

router.get(
  "/get-quizzes-from-user",
  authenticate,
  QuizController.getQuizzesFromUser
);

router.get(
  "/get-quiz/:idQuiz",
  authenticate,
  param("idQuiz")
    .notEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Id inválido"),
  validateErrors,
  QuizController.getQuiz
);

router.get(
  "/get-quiz-by-token",
  body("token")
    .notEmpty()
    .withMessage("Debes ingresar un token")
    .isString()
    .withMessage("El token debe ser un string alfanumérico"),
  validateErrors,
  QuizController.getQuizByToken
);

router.delete(
  "/:idQuiz",
  authenticate,
  param("idQuiz")
    .notEmpty()
    .withMessage("El id es requerido")
    .isMongoId()
    .withMessage("Id inválido"),
  validateErrors,
  QuizController.deleteQuiz
);

router.get("/categories", QuizController.getCategories);

export default router;
