import { Empleado } from "./Empleado";

export interface EmpleadoRepository {
  createEmpleado(
    nombre: string,
    telefono: string,
    correo: string,
    puesto: string,
    tiendaCorreo: string
  ): Promise<Empleado | null>;

  getById(id: string): Promise<Empleado | null>;

  getAll(): Promise<Empleado[] | null>;  // Método para obtener todos los empleados

  getAllByTiendaCorreo(tiendaCorreo: string): Promise<Empleado[] | null>;

  updateEmpleado(
    id: string,
    nombre?: string,
    telefono?: string,
    correo?: string,
    puesto?: string
  ): Promise<Empleado | null>;

  deleteEmpleado(id: string): Promise<boolean>;

  // Método para validar duplicidad de correo o teléfono
  validateUniqueContact(telefono: string, correo: string): Promise<boolean>;
}
