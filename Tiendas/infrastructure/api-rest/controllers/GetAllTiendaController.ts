import { Request, Response } from "express";
import { GetAllTiendaUseCase } from "../../../application/GetAllTiendaUseCase";

export class GetAllTiendaController {
  constructor(readonly getAllTiendaUseCase: GetAllTiendaUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const tiendas = await this.getAllTiendaUseCase.run();
      if (tiendas) {
        res.status(200).json(
          tiendas.map((tienda: any) => {
            return {
              id: tienda.id,
              nombre: tienda.nombre,
              direccion: tienda.direccion,
              telefono: tienda.telefono,
              correo: tienda.correo,
              descripcion: tienda.descripcion,
              userId: tienda.userId,
              horario: tienda.horario,
              estado: tienda.estado,
            };
          })
        );
      } else {
        res.status(400).json({
          status: "Error",
          msn: "Ha ocurrido un problema al obtener las tiendas.",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
