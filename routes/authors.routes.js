import { Router } from "express";
import { AuthorsController } from "../controllers/index.js";

export const AuthorRouter = Router();

AuthorRouter.get("/", AuthorsController.getAuthors);
AuthorRouter.get("/:id", AuthorsController.getAuthorById);
AuthorRouter.post("/", AuthorsController.createAuthor);
AuthorRouter.put("/:id", AuthorsController.updateAuthor);
AuthorRouter.delete("/:id", AuthorsController.deleteAuthor);