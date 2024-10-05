import express from "express";
import {
  createEmpleadoController,
  deleteEmpleadoController,
  getAllEmpleadoController,
  getAllEmpleadoByTiendaController,
  getByIdEmpleadoController,
  updateEmpleadoController
} from "../dependencies/dependencies";

export const empleadoRouter = express.Router();

// Crear empleado
empleadoRouter.post("/create", createEmpleadoController.run.bind(createEmpleadoController));

// Obtener empleado por ID
empleadoRouter.get("/get/:id", getByIdEmpleadoController.run.bind(getByIdEmpleadoController));

// Obtener todos los empleados
empleadoRouter.get("/get", getAllEmpleadoController.run.bind(getAllEmpleadoController));

// Obtener empleados por tiendaCorreo
empleadoRouter.get("/:tiendaCorreo", getAllEmpleadoByTiendaController.run.bind(getAllEmpleadoByTiendaController));

// Eliminar empleado por ID
empleadoRouter.delete("/delete/:id", deleteEmpleadoController.run.bind(deleteEmpleadoController));

// Actualizar empleado por ID
empleadoRouter.put("/update/:id", updateEmpleadoController.run.bind(updateEmpleadoController));
