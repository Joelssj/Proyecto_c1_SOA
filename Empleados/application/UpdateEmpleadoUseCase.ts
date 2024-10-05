import { Empleado } from "../domain/Empleado";
import { EmpleadoRepository } from "../domain/EmpleadoRepository";

export class UpdateEmpleadoUseCase {
  constructor(readonly empleadoRepository: EmpleadoRepository) {}

  async run(
    id: string,
    nombre?: string,
    telefono?: string,
    correo?: string,
    puesto?: string
  ): Promise<Empleado | null> {
    try {
      // Verificar si el teléfono o correo ya existen en otro empleado
      if (telefono || correo) {
        // Solo validar si `telefono` y `correo` no son `undefined`
        const isContactUnique = await this.empleadoRepository.validateUniqueContact(telefono ?? '', correo ?? '');
        if (!isContactUnique) {
          throw new Error("El teléfono o correo ya están registrados.");
        }
      }

      const empleado = await this.empleadoRepository.updateEmpleado(
        id,
        nombre,
        telefono,
        correo,
        puesto
      );
      return empleado;
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
      return null;
    }
  }
}
