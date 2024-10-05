import { CreateTiendaUseCase } from "../../../application/CreateTiendaUseCase";
import { GetByIdTiendaUseCase } from "../../../application/GetByIdTiendaUseCase";
import { GetAllTiendaUseCase } from "../../../application/GetAllTiendaUseCase";
import { DeleteTiendaUseCase } from "../../../application/DeleteTiendaUseCase";
import { UpdateTiendaUseCase } from "../../../application/UpdateTiendaUseCase";
import { GetAllTiendasByUserUseCase } from "../../../application/GetAllTiendasByUserUseCase";

import { CreateTiendaController } from "../controllers/CreateTiendaController";
import { GetAllTiendaController } from "../controllers/GetAllTiendaController";
import { GetByIdTiendaController } from "../controllers/GetByIdTiendaController";
import { DeleteTiendaController } from "../controllers/DeleteTiendaController"; 
import { UpdateTiendaController } from "../controllers/UpdateUsersControllers";
import { MysqlTiendaRepository } from "../../adapters/MysqlTiendaRepository";
import { MysqlUsersRepository } from "../../../../Users/infrastructure/adapters/MysqlUsersRepository";
import { GetAllTiendasByUserController } from "../controllers/GetAllTiendasByUserController";




export const tiendaRepository = new MysqlTiendaRepository();
export const usersRepository = new MysqlUsersRepository(); // Instancia de usersRepository

// Casos de uso
export const createTiendaUseCase = new CreateTiendaUseCase(tiendaRepository, usersRepository); // Pasar ambos argumentos aquí
export const getAllTiendaUseCase = new GetAllTiendaUseCase(tiendaRepository);
export const getByIdTiendaUseCase = new GetByIdTiendaUseCase(tiendaRepository);
export const deleteTiendaUseCase = new DeleteTiendaUseCase(tiendaRepository);
export const updateTiendaUseCase = new UpdateTiendaUseCase(tiendaRepository);
export const getAllTiendasByUserUseCase = new GetAllTiendasByUserUseCase(tiendaRepository);

// Controladores
export const createTiendaController = new CreateTiendaController(createTiendaUseCase);
export const getAllTiendaController = new GetAllTiendaController(getAllTiendaUseCase);
export const getByIdTiendaController = new GetByIdTiendaController(getByIdTiendaUseCase);
export const deleteTiendaController = new DeleteTiendaController(deleteTiendaUseCase);
export const updateTiendaController = new UpdateTiendaController(updateTiendaUseCase);
export const getAllTiendasByUserController = new GetAllTiendasByUserController(getAllTiendasByUserUseCase);

