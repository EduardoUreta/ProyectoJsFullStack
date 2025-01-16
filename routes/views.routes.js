import { Router } from "express";
import { ViewsController } from "../controllers/index.js";
import { AuthMiddleware, IsAdminMiddleware, MyProfileMiddleware } from "../middlewares/index.js";
import { uploadAvatar } from "../utils/index.js";

export const ViewsRouter = Router();

ViewsRouter.get("/", ViewsController.inicio);
ViewsRouter.get("/registro", ViewsController.registro);
ViewsRouter.get("/login", ViewsController.login);
ViewsRouter.get("/tienda", ViewsController.tienda);
ViewsRouter.get("/detalle-libro/:id", ViewsController.detalleLibro);
ViewsRouter.get("/perfil/:id", AuthMiddleware, MyProfileMiddleware, ViewsController.perfil);
ViewsRouter.get("/agregar-libro", AuthMiddleware, IsAdminMiddleware, ViewsController.agregarLibro);
ViewsRouter.get("/listado-libro", AuthMiddleware, IsAdminMiddleware, ViewsController.listadoLibrosAdmin);
// ViewsRouter.get("/logout", ViewsController.logout);
