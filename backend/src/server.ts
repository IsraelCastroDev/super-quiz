import "dotenv/config";
import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";

const server = express();

server.use(express.json());

server.use("/api/v1/users", userRoutes);

server.use(morgan("dev"));

export default server;
