import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import quizRoutes from "./routes/quiz.routes";
import cors from "cors";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

const server = express();
connectDB();

server.use(express.json());
server.use(cors(corsConfig));
server.use(cookieParser());

server.use("/api/v1/users", userRoutes);
server.use("/api/v1/quizzes", quizRoutes);

server.use(morgan("dev"));

export default server;
