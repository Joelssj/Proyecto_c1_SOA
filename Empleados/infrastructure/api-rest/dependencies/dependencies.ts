import { CreateEmpleadoUseCase } from "../../../application/CreateEmpleadoUseCase";
import { GetByIdEmpleadoUseCase } from "../../../application/GetByIdEmpleadoUseCase";
import { GetAllEmpleadoUseCase } from "../../../application/GetAllEmpleadoUseCase";
import { DeleteEmpleadoUseCase } from "../../../application/DeleteEmpleadoUseCase";
import { UpdateEmpleadoUseCase } from "../../../application/UpdateEmpleadoUseCase";
import { GetAllEmpleadosByTiendaUseCase } from "../../../application/GetAllEmpleadosByTiendaUseCase";

import { CreateEmpleadoController } from "../controllers/CreateEmpleadoController";
import { GetAllEmpleadoController } from "../controllers/GetAllEmpleadoController";
import { GetByIdEmpleadoController } from "../controllers/GetByIdEmpleadoController";
import { DeleteEmpleadoController } from "../controllers/DeleteEmpleadoController"; 
import { UpdateEmpleadoController } from "../controllers/UpdateEmpleadoControllers";
import { MysqlEmpleadoRepository } from "../../adapters/MysqlEmpleadoRepository";
import { MysqlTiendaRepository } from "../../../../Tiendas/infrastructure/adapters/MysqlTiendaRepository";
import { GetAllEmpleadosByTiendaController } from "../controllers/GetAllEmpleadoByTiendaController";




export const empleadoRepository = new MysqlEmpleadoRepository();
export const tiendaRepository = new MysqlTiendaRepository(); // Instancia de usersRepository

// Casos de uso
export const createEmpleadoUseCase = new CreateEmpleadoUseCase(empleadoRepository, tiendaRepository); // Pasar ambos argumentos aquí
export const getAllEmpleadoUseCase = new GetAllEmpleadoUseCase(empleadoRepository);
export const getByIdEmpleadoUseCase = new GetByIdEmpleadoUseCase(empleadoRepository);
export const deleteEmpleadoUseCase = new DeleteEmpleadoUseCase(empleadoRepository);
export const updateEmpleadoUseCase = new UpdateEmpleadoUseCase(empleadoRepository);
export const getAllEmpleadoByTiendaUseCase = new GetAllEmpleadosByTiendaUseCase(empleadoRepository);

// Controladores
export const createEmpleadoController = new CreateEmpleadoController(createEmpleadoUseCase);
export const getAllEmpleadoController = new GetAllEmpleadoController(getAllEmpleadoUseCase);
export const getByIdEmpleadoController = new GetByIdEmpleadoController(getByIdEmpleadoUseCase);
export const deleteEmpleadoController = new DeleteEmpleadoController(deleteEmpleadoUseCase);
export const updateEmpleadoController = new UpdateEmpleadoController(updateEmpleadoUseCase);
export const getAllEmpleadoByTiendaController = new GetAllEmpleadosByTiendaController(getAllEmpleadoByTiendaUseCase);

