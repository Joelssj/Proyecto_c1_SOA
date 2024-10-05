import { Tienda } from "../domain/Tienda";
import { TiendaRepository } from "../domain/TiendaRepository";
import { UsersRepository } from "../../Users/domain/UsersRepository";

export class CreateTiendaUseCase {
    constructor(
        readonly tiendaRepository: TiendaRepository,
        readonly usersRepository: UsersRepository
    ) {}

    async run(
        nombre: string,
        direccion: string,
        telefono: string,
        correo: string,
        descripcion: string,
        userCorreo: string,  
        horario: string,
        estado: string
    ): Promise<Tienda | null> {
        const existingUser = await this.usersRepository.getByEmail(userCorreo);
        if (!existingUser) {
            throw new Error("El usuario no existe");
        }


        const tiendaExistente = await this.tiendaRepository.validateDuplicate(nombre, telefono, descripcion, correo);
        if (tiendaExistente) {
            throw new Error("La tienda con el mismo nombre, número de teléfono, descripción, correo ya está registrada.");
        }


        try {
            const tienda = await this.tiendaRepository.createTienda(
                nombre,
                direccion,
                telefono,
                correo,
                descripcion,
                userCorreo,  
                horario,
                estado
            );
            return tienda;
        } catch (error) {
            throw new Error("Error al crear la tienda");
        }
    }
}

