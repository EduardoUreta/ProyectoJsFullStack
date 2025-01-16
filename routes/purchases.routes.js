import { Router } from "express";
import { PurchasesController } from "../controllers/index.js";

export const PurchasesRouter = Router();

PurchasesRouter.get("/", PurchasesController.getPurchases);
PurchasesRouter.get("/:id", PurchasesController.getPurchaseById);
PurchasesRouter.post("/", PurchasesController.createPurchase);
PurchasesRouter.put("/:id", PurchasesController.updatePurchase);
PurchasesRouter.delete("/:id", PurchasesController.deletePurchase);