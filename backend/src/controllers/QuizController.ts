import { Request, Response } from "express";
import User from "../models/User";
import Quiz from "../models/Quiz";
import QuizCategory from "../models/QuizCategory";
import Category from "../models/Category";
import Question, { QuestionType } from "../models/Question";
import { generateTokenQuiz } from "../utils/token";
import Answer from "../models/Answer";

export class QuizController {
  // Crea un nuevo quiz
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
        user: userExists._id,
        questions: [], // Inicialmente vacío
        token: generateTokenQuiz(),
      });

      let questionIds: string[] = []; // Array para almacenar los IDs de las preguntas

      if (questions && questions.length > 0) {
        // Crear preguntas y almacenar sus IDs
        const questionPromises = questions.map(async (q: QuestionType) => {
          // Crear la pregunta
          const newQuestion = await Question.create({
            title: q.title,
            quiz: quiz._id, // Referencia al quiz
          });

          let answerIds: string[] = []; // Para almacenar los IDs de las respuestas

          // Crear respuestas asociadas a la pregunta (si hay)
          if (q.answers && q.answers.length > 0) {
            const answerPromises = q.answers.map(async (a: any) => {
              const answer = await Answer.create({
                title: a.title,
                is_correct: a.is_correct,
                question: newQuestion._id, // Relación con la pregunta
              });
              answerIds.push(answer._id as string); // Almacenar el ID de la respuesta
            });

            // Esperar a que todas las respuestas se creen
            await Promise.all(answerPromises);

            // Actualizar la pregunta con los IDs de las respuestas
            await Question.updateOne(
              { _id: newQuestion._id },
              { $push: { answers: { $each: answerIds } } }
            );
          }

          questionIds.push(newQuestion._id as string); // Agregar el ID de la pregunta al array
        });

        // Esperar a que todas las preguntas se creen
        await Promise.all(questionPromises);
      }

      // Actualizar el quiz para incluir los IDs de las preguntas creadas
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

      // Retornar el token del quiz creado
      res.status(201).json({ token: quiz.token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el quiz" });
    }
  };

  // Obtener los quizzes del usuario
  static getQuizzesFromUser = async (req: Request, res: Response) => {
    try {
      const userExists = await User.findOne({ email: req.userEmail });

      if (!userExists) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      const userQuizzes = await Quiz.find({ user: userExists._id }).populate(
        "questions"
      );

      const quizzes = userQuizzes.map((quiz) => {
        return {
          _id: quiz._id,
          title: quiz.title,
          score: quiz.score,
          questions: quiz.questions.map((question: any) => {
            return {
              id: question?._id,
              name: question.name,
              is_correct: question.is_correct,
            };
          }),
        };
      });

      res.status(200).json(quizzes);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los quizzes" });
      return;
    }
  };

  static getQuiz = async (req: Request, res: Response) => {
    try {
      const { idQuiz } = req.params;

      const userExists = await User.findOne({ email: req.userEmail });
      if (!userExists) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      const quizExists = await Quiz.findOne({ _id: idQuiz }).populate(
        "questions"
      );
      if (!quizExists) {
        res.status(400).json({ message: "El quiz no existe" });
        return;
      }

      const quiz = {
        _id: quizExists._id,
        title: quizExists.title,
        score: quizExists.score,
        user: quizExists.user,
        questions: quizExists.questions.map((question: any) => {
          return {
            _id: question._id,
            name: question.name,
            is_correct: question.is_correct,
            quiz: question.quiz,
          };
        }),
      };

      res.status(201).json(quiz);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el quiz" });
      return;
    }
  };

  static getQuizByToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const quiz = await Quiz.findOne({ token }).populate("questions");

      if (!quiz) {
        res.status(404).json({ message: "El token no existe" });
        return;
      }

      res.status(200).json(quiz);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el quiz" });
      return;
    }
  };

  static deleteQuiz = async (req: Request, res: Response) => {
    const { idQuiz } = req.params;

    try {
      const userExists = await User.findOne({ email: req.userEmail });
      if (!userExists) {
        res.status(400).json({ message: "El usuario no existe" });
        return;
      }

      const quizExists = await Quiz.findOne({ _id: idQuiz });
      if (!quizExists) {
        res.status(400).json({ message: "El quiz no existe" });
        return;
      }

      await Quiz.findOneAndDelete({ user: userExists._id, _id: idQuiz });

      res.status(200).json({ message: "Quiz eliminado exitosamente" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el quiz" });
      return;
    }
  };

  static getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();

      if (!categories) {
        res.status(500).json({ message: "Error al obtener las categorias" });
        return;
      }

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las categorias" });
      return;
    }
  };
}
