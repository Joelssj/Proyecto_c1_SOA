import { Request, Response } from "express";
import { GetAllEmpleadoUseCase } from "../../../application/GetAllEmpleadoUseCase";

export class GetAllEmpleadoController {
  constructor(readonly getAllEmpleadosUseCase: GetAllEmpleadoUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const empleados = await this.getAllEmpleadosUseCase.run();
      if (empleados) {
        res.status(200).json(
          empleados.map((empleado: any) => {
            return {
              id: empleado.id,
              nombre: empleado.nombre,
              telefono: empleado.telefono,
              correo: empleado.correo,
              puesto: empleado.puesto,
              tiendaCorreo: empleado.tiendaCorreo, // Correo de la tienda asociada
            };
          })
        );
      } else {
        res.status(400).json({
          status: "Error",
          msn: "Ha ocurrido un problema al obtener los empleados.",
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
