import { Request, Response } from "express";
import { GetAllTiendasByUserUseCase } from "../../../application/GetAllTiendasByUserUseCase";

export class GetAllTiendasByUserController {
  constructor(readonly getAllTiendasByUserUseCase: GetAllTiendasByUserUseCase) {}

  async run(req: Request, res: Response) {
    const userCorreo = req.params.userCorreo;

    // Validar si el correo se ha proporcionado
    if (!userCorreo) {
      return res.status(400).send({
        status: "Error",
        data: "El correo del usuario es requerido.",
      });
    }

    try {
      // Normalizar el correo
      const normalizedCorreo = userCorreo.trim().toLowerCase();

      const tiendas = await this.getAllTiendasByUserUseCase.run(normalizedCorreo);

      if (tiendas && tiendas.length > 0) {
        res.status(200).send({
          status: "success",
          data: tiendas.map((tienda) => ({
            id: tienda.id,
            nombre: tienda.nombre,
            direccion: tienda.direccion,
            telefono: tienda.telefono,
            correo: tienda.correo,
            descripcion: tienda.descripcion,
            userCorreo: tienda.userCorreo,
            horario: tienda.horario,
            estado: tienda.estado,
          })),
        });
      } else {
        res.status(404).send({
          status: "Error",
          data: "No se encontraron tiendas para este usuario.",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "Error",
        data: "Ha ocurrido un error al obtener las tiendas.",
        msn: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
