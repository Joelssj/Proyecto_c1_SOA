import { Tienda } from "../domain/Tienda";
import { TiendaRepository } from "../domain/TiendaRepository";

export class UpdateTiendaUseCase {
    constructor(readonly tiendaRepository: TiendaRepository) {}

    async run(
        id: string,
        nombre?: string,
        direccion?: string,
        telefono?: string,
        correo?: string,
        descripcion?: string,
        horario?: string,
        estado?: string
    ): Promise<Tienda | null> {
        try {
            const tienda = await this.tiendaRepository.updateTienda(
                id,
                nombre,
                direccion,
                telefono,
                correo,
                descripcion,
                horario,
                estado
            );
            return tienda;
        } catch (error) {
            return null;
        }
    }
}
