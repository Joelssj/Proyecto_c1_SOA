import { Tienda } from "../domain/Tienda";
import { TiendaRepository } from "../domain/TiendaRepository";

export class GetByIdTiendaUseCase {
    constructor(readonly tiendaRepository: TiendaRepository) {}

    async run(id: string): Promise<Tienda | null> {
        try {
            const result = await this.tiendaRepository.getById(id);
            return result;
        } catch (error) {
            return null;
        }
    }
}
