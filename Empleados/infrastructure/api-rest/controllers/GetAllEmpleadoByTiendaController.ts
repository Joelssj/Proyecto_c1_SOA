import { Request, Response } from "express";
import { GetAllEmpleadosByTiendaUseCase } from "../../../application/GetAllEmpleadosByTiendaUseCase";

export class GetAllEmpleadosByTiendaController {
  constructor(readonly getAllEmpleadosByTiendaUseCase: GetAllEmpleadosByTiendaUseCase) {}

  async run(req: Request, res: Response) {
    const tiendaCorreo = req.params.tiendaCorreo;

    // Validar si el correo de la tienda se ha proporcionado
    if (!tiendaCorreo) {
      return res.status(400).send({
        status: "Error",
        data: "El correo de la tienda es requerido.",
      });
    }

    try {
      // Normalizar el correo
      const normalizedCorreo = tiendaCorreo.trim().toLowerCase();

      const empleados = await this.getAllEmpleadosByTiendaUseCase.run(normalizedCorreo);

      if (empleados && empleados.length > 0) {
        res.status(200).send({
          status: "success",
          data: empleados.map((empleado) => ({
            id: empleado.id,
            nombre: empleado.nombre,
            telefono: empleado.telefono,
            correo: empleado.correo,
            puesto: empleado.puesto,
            tiendaCorreo: empleado.tiendaCorreo,
          })),
        });
      } else {
        res.status(404).send({
          status: "Error",
          data: "No se encontraron empleados para esta tienda.",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "Error",
        data: "Ha ocurrido un error al obtener los empleados.",
        msn: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
