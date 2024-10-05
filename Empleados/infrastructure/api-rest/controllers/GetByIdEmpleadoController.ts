import { Request, Response } from "express";
import { GetByIdEmpleadoUseCase } from "../../../application/GetByIdEmpleadoUseCase";

export class GetByIdEmpleadoController {
  constructor(readonly getByIdEmpleadoUseCase: GetByIdEmpleadoUseCase) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id; 
    try {
      const empleado = await this.getByIdEmpleadoUseCase.run(id);

      if (empleado) {
        // Código HTTP: 200 -> Consulta exitosa
        res.status(200).send({
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
        res.status(404).send({
          status: "Error",
          msn: "Empleado no encontrado",
        });
      }
    } catch (error) {
      // Código HTTP: 500 -> Error interno del servidor
      res.status(500).send({
        status: "Error",
        data: "Ocurrió un error al obtener el empleado",
        msn: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
