import { TiendaRepository } from "../domain/TiendaRepository";

export class DeleteTiendaUseCase {
    constructor(readonly tiendaRepository: TiendaRepository) {}

    async run(tiendaId: string): Promise<boolean> {
        try {
            const result = await this.tiendaRepository.deleteTienda(tiendaId);
            return result;
        } catch (error) {
            return false;
        }
    }
}
