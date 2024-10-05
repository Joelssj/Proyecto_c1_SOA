import express from "express";
import { createTiendaController, deleteTiendaController, getAllTiendaController, getAllTiendasByUserController} from "../dependencies/dependencies";
import { getByIdTiendaController } from "../dependencies/dependencies";
import { updateTiendaController } from "../dependencies/dependencies";

export const tiendaRouter = express.Router();

tiendaRouter.post( "/crear", createTiendaController.run.bind(createTiendaController));
tiendaRouter.get("/get/:id",getByIdTiendaController.run.bind(getByIdTiendaController));
tiendaRouter.get("/get",getAllTiendaController.run.bind(getAllTiendaController));
tiendaRouter.get("/:userCorreo",getAllTiendasByUserController.run.bind(getAllTiendasByUserController));
tiendaRouter.delete("/delete/:id",deleteTiendaController.run.bind(deleteTiendaController));
tiendaRouter.put("/update/:id",updateTiendaController.run.bind(updateTiendaController));
