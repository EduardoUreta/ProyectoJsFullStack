import { Router } from "express";
import { UsersController } from "../controllers/index.js";
import { uploadAvatar } from "../utils/index.js";

export const UsersRouter = Router();

UsersRouter.get("/", UsersController.getUsers);
UsersRouter.get("/:id", UsersController.getUserById);
UsersRouter.post("/", uploadAvatar.single('avatar'), UsersController.createUser);
UsersRouter.put("/:id", uploadAvatar.single('avatar'), UsersController.updateUser);
UsersRouter.delete("/:id", UsersController.deleteUser);

UsersRouter.get("/purchases/:id", UsersController.findPurcharse);