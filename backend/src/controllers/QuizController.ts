import { Request, Response } from "express";
import User from "../models/User";
import Quiz from "../models/Quiz";
import QuizCategory from "../models/QuizCategory";
import Category from "../models/Category";
import Question, { QuestionType } from "../models/Question";
import { generateTokenQuiz } from "../utils/token";
import Answer from "../models/Answer";
import { SubmitQuizData } from "../types";

export class QuizController {
  // Crea un nuevo quiz
  static createQuiz = async (req: Request, res: Response) => {
    const { title, categories, questions, duration } = req.body;

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
        duration,
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

      const userQuizzes = await Quiz.find({ user: userExists._id });

      const quizzesWithCategories = await Promise.all(
        userQuizzes.map(async (quiz) => {
          const quizCategories = await QuizCategory.find({
            quiz: quiz._id,
          }).populate("category");

          return {
            _id: quiz._id,
            title: quiz.title,
            score: quiz.score,
            categories: quizCategories.map((qc) => ({
              category: qc.category,
            })),
            questions: quiz.questions.map((q) => ({
              id: q._id,
            })),
            duration: quiz.duration,
            token: quiz.token,
          };
        })
      );

      res.status(200).json(quizzesWithCategories);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los quizzes" });
      return;
    }
  };

  // obtener un quiz por su id - auth
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
        token: quizExists.token,
        duration: quizExists.duration,
      };

      res.status(201).json(quiz);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el quiz" });
      return;
    }
  };

  // verificar si un quiz existe
  static checkQuizExists = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;

      const quiz = await Quiz.findOne({ token });
      if (!quiz) {
        res.status(404).json({ exists: false });
        return;
      }

      res.status(200).json({ exists: true, quiz: quiz._id });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el quiz" });
      return;
    }
  };

  // obtener un quiz por su id
  static getQuizById = async (req: Request, res: Response) => {
    try {
      const { quizId } = req.params;

      const quizExists = await Quiz.findOne({ _id: quizId }).populate(
        "questions"
      );

      if (!quizExists) {
        res.status(404).json({ message: "El token no existe" });
        return;
      }

      const categories = await QuizCategory.find({ quiz: quizExists._id });

      const quiz = {
        _id: quizExists._id,
        title: quizExists.title,
        score: quizExists.score,
        user: quizExists.user,
        questions: quizExists.questions,
        token: quizExists.token,
        duration: quizExists.duration,
        categories,
        __v: quizExists.__v,
      };

      res.status(200).json(quiz);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el quiz" });
      return;
    }
  };

  // eliminar un quiz
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

      // Extraer los IDs de las preguntas
      const questionIds = quizExists.questions.map((q) => q.toString());

      if (questionIds.length > 0) {
        // Eliminar respuestas asociadas a las preguntas
        await Answer.deleteMany({ question: { $in: questionIds } });

        // Eliminar las preguntas
        await Question.deleteMany({ _id: { $in: questionIds } });
      }

      // Finalmente, elimina el quiz
      await QuizCategory.findOneAndDelete({ quiz: idQuiz });
      await Quiz.findOneAndDelete({ user: userExists._id, _id: idQuiz });

      res.status(200).json({ message: "Quiz eliminado exitosamente" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el quiz" });
      return;
    }
  };

  // obtener las categorias
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

  // obtener categoria por su id
  static getCategorieById = async (req: Request, res: Response) => {
    try {
      const { idCategory } = req.params;

      const categorie = await Category.findOne({ _id: idCategory });

      if (!categorie) {
        res.status(404).json({ message: "Categoría no encontrado" });
        return;
      }

      res.status(200).json(categorie);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener categoría" });
      return;
    }
  };

  // obtener quizzes por categoria
  static getQuizzesByCategory = async (req: Request, res: Response) => {
    const { categorie } = req.params;

    try {
      const categorieExists = await Category.findOne({ slug: categorie });

      if (!categorieExists) {
        res.status(404).json({ message: "La categoría no existe" });
        return;
      }

      const quizzes = await QuizCategory.find({
        category: categorieExists._id,
      })
        .populate("quiz")
        .populate("category");

      if (!quizzes || quizzes.length === 0) {
        res.status(404).json({
          message: `No hay Super Quizzes en la categoría ${categorieExists.name}`,
        });
        return;
      }

      res.status(202).json(quizzes);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los datos" });
    }
  };

  // obtener respuestas de una pregunta
  static getAnswersFromQuestion = async (req: Request, res: Response) => {
    try {
      const { questionId } = req.params;

      const answers = await Answer.find({ question: questionId });

      if (!answers) {
        res.status(404).json({ message: "No se encontraron respuestas" });
        return;
      }

      res.status(200).json(answers);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al cargar las respuestas" });
    }
  };

  static calculateResultQuiz = async (req: Request, res: Response) => {
    try {
      const { quizData }: { quizData: SubmitQuizData } = req.body;
      const { quizId, answers } = quizData;

      const quizExists = await Quiz.findOne({ _id: quizId });

      if (!quizExists) {
        res.status(404).json({ message: "El quiz no existe" });
        return;
      }

      let score = 0;

      for (const answer of answers) {
        const { questionId, answerId } = answer;
        const question = await Question.findOne({ _id: questionId });

        if (!question) {
          res.status(404).json({ message: "Pregunta no encontrada" });
          return;
        }

        const correctAnswerId = question.answers.find(
          (ans) => ans._id.toString() === answerId
        );

        const correctAnswer = await Answer.findOne({ _id: correctAnswerId });

        if (correctAnswer?.is_correct) {
          score += 100;
        }
      }

      res.status(200).json({ score });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el resultado" });
      return;
    }
  };
}
