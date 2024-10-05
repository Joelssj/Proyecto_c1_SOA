import { Request, Response } from "express";
import { DeleteEmpleadoUseCase } from "../../../application/DeleteEmpleadoUseCase";

export class DeleteEmpleadoController {
  constructor(readonly deleteEmpleadoUseCase: DeleteEmpleadoUseCase) {}

  async run(req: Request, res: Response) {
    const empleadoId = req.params.id; // Obtener el ID del empleado desde los parámetros de la solicitud
    try {
      const result = await this.deleteEmpleadoUseCase.run(empleadoId);
      if (result) {
        res.status(200).send({
          status: "success",
          data: `El empleado con ID: ${empleadoId} ha sido eliminado.`,
        });
      } else {
        res.status(404).send({
          status: "Error",
          data: `Empleado con ID ${empleadoId} no encontrado.`,
        });
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Error desconocido";
      res.status(500).send({
        status: "Error",
        data: "Ocurrió un error al intentar eliminar el empleado.",
        message: errorMessage,
      });
    }
  }
}

