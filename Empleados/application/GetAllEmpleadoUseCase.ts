import { Empleado } from "../domain/Empleado";
import { EmpleadoRepository } from "../domain/EmpleadoRepository";

export class GetAllEmpleadoUseCase {
  constructor(readonly empleadoRepository: EmpleadoRepository) {}

  async run(): Promise<Empleado[] | null> {
    try {
      const result = await this.empleadoRepository.getAll();
      return result;
    } catch (error) {
      console.error("Error al obtener todos los empleados:", error);
      return null;
    }
  }
}
