import { EmpleadoRepository } from "../domain/EmpleadoRepository";

export class DeleteEmpleadoUseCase {
  constructor(readonly empleadoRepository: EmpleadoRepository) {}

  async run(empleadoId: string): Promise<boolean> {
    try {
      const result = await this.empleadoRepository.deleteEmpleado(empleadoId);
      return result;
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      return false;
    }
  }
}
