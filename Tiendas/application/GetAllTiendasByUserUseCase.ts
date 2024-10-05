import { TiendaRepository } from "../domain/TiendaRepository";
import { Tienda } from "../domain/Tienda";

export class GetAllTiendasByUserUseCase {
  constructor(readonly tiendaRepository: TiendaRepository) {}

  async run(userCorreo: string): Promise<Tienda[] | null> {
    try {
      const normalizedCorreo = userCorreo.trim().toLowerCase();
      
      const tiendas = await this.tiendaRepository.getAllByUserCorreo(normalizedCorreo);
      return tiendas;
    } catch (error) {
      throw new Error("Error al obtener las tiendas del usuario");
    }
  }
}
