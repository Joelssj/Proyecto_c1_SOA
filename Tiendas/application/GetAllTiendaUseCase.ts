import { Tienda } from "../domain/Tienda";
import { TiendaRepository } from "../domain/TiendaRepository";

export class GetAllTiendaUseCase {
    constructor(readonly tiendaRepository: TiendaRepository) {}

    async run(): Promise<Tienda[] | null> {
        try {
            const result = await this.tiendaRepository.getAll();
            return result;
        } catch (error) {
            return null;
        }
    }
}
