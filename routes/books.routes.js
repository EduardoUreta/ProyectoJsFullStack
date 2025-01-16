import { Router } from "express";
import { BooksController } from "../controllers/index.js";
import { AuthMiddleware, IsAdminMiddleware } from "../middlewares/index.js";
import { uploadAvatar  } from "../utils/index.js";

export const BooksRouter = Router();

BooksRouter.get("/", BooksController.getBooks);
BooksRouter.get("/:id", BooksController.getBookById);
BooksRouter.post("/", AuthMiddleware, IsAdminMiddleware, uploadAvatar.single('imagen'), BooksController.createBook);
BooksRouter.put("/:id", AuthMiddleware, IsAdminMiddleware, uploadAvatar.single('imagen'),  BooksController.updateBook);
BooksRouter.delete("/:id", AuthMiddleware, IsAdminMiddleware, uploadAvatar.single('imagen'),  BooksController.deleteBook);