import { Request, Response } from "express";
import { UpdateEmpleadoUseCase } from "../../../application/UpdateEmpleadoUseCase";

export class UpdateEmpleadoController {
  constructor(readonly updateEmpleadoUseCase: UpdateEmpleadoUseCase) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      const empleado = await this.updateEmpleadoUseCase.run(
        id,
        data.nombre,
        data.telefono,
        data.correo,
        data.puesto
      );

      if (empleado) {
        res.status(200).send({
          status: "success",
          data: {
            id: empleado.id,
            nombre: empleado.nombre,
            telefono: empleado.telefono,
            correo: empleado.correo,
            puesto: empleado.puesto,
            tiendaCorreo: empleado.tiendaCorreo
          }
        });
      } else {
        res.status(404).send({
          status: "Empleado not found",
          data: "No fue posible actualizar el empleado"
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
