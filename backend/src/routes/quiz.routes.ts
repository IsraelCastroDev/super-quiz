import { Router } from "express";
import { createQuiz } from "../controllers/QuizController";
import { authenticate } from "../middlewares/authenticate.middleware";

const router = Router();

router.post("/create-quiz", authenticate, createQuiz);

export default router;
