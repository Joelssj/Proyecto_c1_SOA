import { Request, Response } from "express";
import { CreateTiendaUseCase } from "../../../application/CreateTiendaUseCase";

export class CreateTiendaController {
  constructor(readonly createTiendaUseCase: CreateTiendaUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    try {
      const tienda = await this.createTiendaUseCase.run(
        data.nombre,
        data.direccion,
        data.telefono,
        data.correo,
        data.descripcion,
        data.userCorreo,
        data.horario,
        data.estado
      );

      if (tienda) {
        res.status(201).send({
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
        res.status(400).send({
          status: "Error de registro",
          data: "No fue posible agregar la tienda",
        });
      }
    } catch (error) {

      if (error instanceof Error && error.message === "La tienda con el mismo nombre, número de teléfono, descripción, correo ya está registrada.") {
        res.status(409).send({  
          status: "Error",
          data: "La tienda con el mismo nombre, número de teléfono, descripción, correo ya está registrada.",
        });
      } else if (error instanceof Error && error.message === "El usuario no existe") {
        res.status(404).send({  
          status: "Error",
          data: "El usuario no existe.",
        });
      } else {
        res.status(500).send({
          status: "Error",
          data: "Ha ocurrido un error",
          msn: error instanceof Error ? error.message : "Error desconocido",
        });
      }
    }
  }
}

