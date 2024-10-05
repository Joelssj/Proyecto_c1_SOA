import { Request, Response } from "express";
import { DeleteTiendaUseCase } from "../../../application/DeleteTiendaUseCase";



export class DeleteTiendaController {
    constructor(readonly deleteTiendaUseCase: DeleteTiendaUseCase) {}

    async run(req: Request, res: Response) {
        const tiendaId = req.params.id;
        try {
            const result = await this.deleteTiendaUseCase.run(tiendaId);
            if (result) {
                res.status(200).send({
                    status: "success",
                    data: `La tienda con id: ${tiendaId} ha sido eliminada.`,
                });
            } else {
                res.status(404).send({
                    status: "Error",
                    data: `Tienda con ID ${tiendaId} no encontrada.`,
                });
            }
        } catch (error) {
            const errorMessage = (error as Error).message || "Error desconocido";
            res.status(500).send({
                status: "Error",
                data: "Ocurrió un error al intentar eliminar la tienda.",
                message: errorMessage,
            });
        }
    }
}
