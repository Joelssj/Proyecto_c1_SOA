import { EmpleadoRepository } from "../domain/EmpleadoRepository";
import { Empleado } from "../domain/Empleado";

export class GetAllEmpleadosByTiendaUseCase {
  constructor(readonly empleadoRepository: EmpleadoRepository) {}

  async run(tiendaCorreo: string): Promise<Empleado[] | null> {
    try {
      // Normalizar el correo: quitar espacios y convertir a minúsculas
      const normalizedCorreo = tiendaCorreo.trim().toLowerCase();

      const empleados = await this.empleadoRepository.getAllByTiendaCorreo(normalizedCorreo);
      return empleados;
    } catch (error) {
      throw new Error("Error al obtener los empleados de la tienda");
    }
  }
}

