import { Request, Response } from "express";
import User from "../models/User";
import Quiz from "../models/Quiz";
import QuizCategory from "../models/QuizCategory";
import Category from "../models/Category";
import Question, { QuestionType } from "../models/Question";

export class QuizController {
  static createQuiz = async (req: Request, res: Response) => {
    const { title, categories, questions } = req.body;

    try {
      const userExists = await User.findOne({ email: req.userEmail });

      if (!userExists) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      // Crear el quiz inicialmente sin las preguntas
      const quiz = await Quiz.create({
        title,
        score: 0,
        user: userExists._id,
        questions: [], // Inicialmente vacío
      });

      let questionIds: string[] = []; // Array para almacenar los IDs de las preguntas

      if (questions && questions.length > 0) {
        // Crear preguntas y almacenar sus IDs
        const questionPromises = questions.map(async (q: QuestionType) => {
          const question = await Question.create({
            name: q.name,
            is_correct: q.is_correct,
            quiz: quiz._id, // Referencia al quiz
          });
          questionIds.push(question._id as string); // Agregar el ID de la pregunta al array
        });

        // Esperar a que todas las preguntas se creen
        await Promise.all(questionPromises);
      }

      // Actualizar el quiz para incluir los IDs de las preguntas
      await Quiz.updateOne(
        { _id: quiz._id },
        { $push: { questions: { $each: questionIds } } }
      );

      // Verificar si las categorías existen
      if (categories && categories.length > 0) {
        const existingCategories = await Category.find({
          name: { $in: categories },
        });

        if (existingCategories.length !== categories.length) {
          res.status(400).json({ message: "Algunas categorías no existen" });
          return;
        }

        // Crear registros en la tabla pivote QuizCategory
        const quizCategoryPromises = existingCategories.map((category) => {
          return QuizCategory.create({
            quiz: quiz._id,
            category: category._id,
            state: "active",
          });
        });

        // Esperar a que todas las promesas de creación se completen
        await Promise.all(quizCategoryPromises);
      }

      // Actualizar el usuario para incluir el nuevo quiz
      await User.updateOne(
        { _id: userExists._id },
        { $push: { quizzes: quiz._id } }
      );

      res.status(201).json({ message: "Quiz creado exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el quiz" });
    }
  };
}
