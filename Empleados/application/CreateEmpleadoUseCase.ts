import { EmpleadoRepository } from "../domain/EmpleadoRepository";
import { TiendaRepository } from "../../Tiendas/domain/TiendaRepository"; // Importar TiendaRepository
import { Empleado } from "../domain/Empleado";

export class CreateEmpleadoUseCase {
    constructor(
        readonly empleadoRepository: EmpleadoRepository,
        readonly tiendaRepository: TiendaRepository
    ) {}

    async run(
        nombre: string,
        telefono: string,
        correo: string,
        puesto: string,
        tiendaCorreo: string
    ): Promise<Empleado | null> {
        // Verificar si la tienda existe usando su correo
        const existingTienda = await this.tiendaRepository.getAllByUserCorreo(tiendaCorreo);
        if (!existingTienda || existingTienda.length === 0) {
            throw new Error("La tienda no existe");
        }

        // Verificar si un empleado con el mismo teléfono o correo ya está registrado
        const empleadoExistente = await this.empleadoRepository.validateUniqueContact(telefono, correo);
        if (empleadoExistente) {
            throw new Error("El teléfono o correo ya están registrados.");
        }

        // Crear el empleado usando los datos proporcionados
        try {
            const empleado = await this.empleadoRepository.createEmpleado(
                nombre,
                telefono,
                correo,
                puesto,
                tiendaCorreo // Asociar empleado con la tienda por su correo
            );
            return empleado;
        } catch (error) {
            throw new Error("Error al crear el empleado");
        }
    }
}
