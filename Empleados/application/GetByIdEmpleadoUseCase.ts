import { Empleado } from "../domain/Empleado";
import { EmpleadoRepository } from "../domain/EmpleadoRepository";

export class GetByIdEmpleadoUseCase {
  constructor(readonly empleadoRepository: EmpleadoRepository) {}

  async run(id: string): Promise<Empleado | null> {
    try {
      const result = await this.empleadoRepository.getById(id);
      return result;
    } catch (error) {
      console.error("Error al obtener el empleado por ID:", error);
      return null;
    }
  }
}
