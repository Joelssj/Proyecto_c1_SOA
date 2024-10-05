import { Request, Response } from "express";
import { GetByIdTiendaUseCase } from "../../../application/GetByIdTiendaUseCase";

export class GetByIdTiendaController {
  constructor(readonly getByIdTiendaUseCase: GetByIdTiendaUseCase) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id; 
    try {
      const tienda = await this.getByIdTiendaUseCase.run(id);

      if (tienda) {
        // Código HTTP: 200 -> Consulta exitosa
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
            estado: tienda.estado,
          },
        });
      } else {
        res.status(404).send({
          status: "Error",
          msn: "Tienda no encontrada",
        });
      }
    } catch (error) {
      // Código HTTP: 500 -> Error interno del servidor
      res.status(500).send({
        status: "Error",
        data: "Ocurrió un error al obtener la tienda",
        msn: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
