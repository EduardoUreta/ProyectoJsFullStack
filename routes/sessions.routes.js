import { Router } from "express";
import { SessionsController } from "../controllers/index.js";
import { AuthMiddleware } from "../middlewares/index.js";

export const SessionsRouter = Router();

SessionsRouter.post("/login", SessionsController.login);
SessionsRouter.delete("/logout", AuthMiddleware, SessionsController.logout);