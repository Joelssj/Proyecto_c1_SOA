import { Request, Response } from "express";
import { UpdateTiendaUseCase } from "../../../application/UpdateTiendaUseCase";

export class UpdateTiendaController {
    constructor(readonly updateTiendaUseCase: UpdateTiendaUseCase) {}

    async run(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        try {
            const tienda = await this.updateTiendaUseCase.run(
                id,
                data.nombre,
                data.direccion,
                data.telefono,
                data.correo,
                data.descripcion,
                data.horario,
                data.estado
            );

            if (tienda) {
                res.status(200).send({
                    status: "success",
                    data: {
                        id: tienda.id,
                        nombre: tienda.nombre,
                        direccion: tienda.direccion,
                        telefono: tienda.telefono,
                        correo: tienda.correo,
                        descripcion: tienda.descripcion,
                        userCorreo: tienda.userCorreo,
                        horario: tienda.horario,
                        estado: tienda.estado
                    }
                });
            } else {
                res.status(404).send({
                    status: "Tienda not found",
                    data: "No fue posible actualizar la tienda"
                });
            }
        } catch (error) {
            res.status(500).send({
                status: "Error",
                data: "Ha ocurrido un error",
                msn: (error as Error).message
            });
        }
    }
}
