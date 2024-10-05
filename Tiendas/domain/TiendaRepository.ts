import { Tienda } from "./Tienda";

export interface TiendaRepository {
  createTienda(
    nombre: string,
    direccion: string,
    telefono: string,
    correo: string,
    descripcion: string,
    userCorreo: string,
    horario: string,
    estado: string
  ): Promise<Tienda | null>;

  getById(id: string): Promise<Tienda | null>;

  getAll(): Promise<Tienda[] | null>;

  getAllByUserCorreo(userCorreo: string): Promise<Tienda[] | null>; // Nuevo método

  updateTienda(
    id: string,
    nombre?: string,
    direccion?: string,
    telefono?: string,
    correo?: string,
    descripcion?: string,
    horario?: string,
    estado?: string
  ): Promise<Tienda | null>;

  deleteTienda(id: string): Promise<boolean>;

  validateDuplicate(
    nombre: string,
    telefono: string,
    descripcion: string,
    correo: string
  ): Promise<boolean>;
}



/*import { Tienda } from "./Tienda";

export interface TiendaRepository {
  createTienda(
    nombre: string,
    direccion: string,
    telefono: string,
    correo: string,
    descripcion: string,
    userCorreo: string,
    horario: string,
    estado: string
  ): Promise<Tienda | null>;

  getById(id: string): Promise<Tienda | null>;

  getAll(): Promise<Tienda[] | null>;

  updateTienda(
    id: string,
    nombre?: string,
    direccion?: string,
    telefono?: string,
    correo?: string,
    descripcion?: string,
    horario?: string,
    estado?: string
  ): Promise<Tienda | null>;

  deleteTienda(id: string): Promise<boolean>;

  // Método para verificar si existe una tienda con el mismo nombre, teléfono o descripción
  validateDuplicate(
    nombre: string,
    telefono: string,
    descripcion: string
  ): Promise<boolean>;
}
*/