import { Router } from "express";
import { CategoriesController } from "../controllers/index.js";

export const CategoriesRouter = Router();

CategoriesRouter.get("/", CategoriesController.getCategories);
CategoriesRouter.get("/:id", CategoriesController.getCategoryById);
CategoriesRouter.post("/", CategoriesController.createCategory);
CategoriesRouter.put("/:id", CategoriesController.updateCategory);
CategoriesRouter.delete("/:id", CategoriesController.deleteCategory);