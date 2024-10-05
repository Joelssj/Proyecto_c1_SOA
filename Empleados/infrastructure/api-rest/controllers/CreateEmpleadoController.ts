import { Request, Response } from "express";
import { CreateEmpleadoUseCase } from "../../../application/CreateEmpleadoUseCase";

export class CreateEmpleadoController {
  constructor(readonly createEmpleadoUseCase: CreateEmpleadoUseCase) {}

  async run(req: Request, res: Response) {
    const { nombre, telefono, correo, puesto, tiendaCorreo } = req.body;

    try {
      const empleado = await this.createEmpleadoUseCase.run(nombre, telefono, correo, puesto, tiendaCorreo);

      if (empleado) {
        res.status(201).send({
          status: "success",
          data: {
            id: empleado.id,
            nombre: empleado.nombre,
            telefono: empleado.telefono,
            correo: empleado.correo,
            puesto: empleado.puesto,
            tiendaCorreo: empleado.tiendaCorreo,
          },
        });
      } else {
        res.status(400).send({
          status: "error",
          data: "No se pudo crear el empleado.",
        });
      }
    } catch (error) {
      // Manejar errores de duplicados
      if (error instanceof Error && error.message === "El teléfono o correo ya están registrados.") {
        res.status(409).send({  // Código 409 para conflicto
          status: "Error",
          data: error.message,
        });
      } else {
        res.status(500).send({
          status: "error",
          data: "Error al crear el empleado.",
          message: error instanceof Error ? error.message : "Error desconocido",
        });
      }
    }
  }
}
