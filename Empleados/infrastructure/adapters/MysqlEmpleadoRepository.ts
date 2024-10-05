import { Empleado } from "../../domain/Empleado";
import { query } from "../../../database/mysql/mysql";
import { EmpleadoRepository } from "../../domain/EmpleadoRepository";

export class MysqlEmpleadoRepository implements EmpleadoRepository {

  // Obtener todos los empleados asociados a una tienda específica por su correo
  async getAllByTiendaCorreo(tiendaCorreo: string): Promise<Empleado[] | null> {
    try {
      const sql = "SELECT * FROM empleados WHERE tiendaCorreo = ?";
      const params: any[] = [tiendaCorreo];
      const [result]: any = await query(sql, params);

      if (result.length === 0) {
        return null; // No hay empleados asociados a esta tienda
      }

      return result.map((empleado: any) => 
        new Empleado(
          empleado.id,
          empleado.nombre,
          empleado.telefono,
          empleado.correo,
          empleado.puesto,
          empleado.tiendaCorreo
        )
      );
    } catch (error) {
      console.error("Error al obtener empleados de la tienda:", error);
      throw new Error("Error al obtener los empleados de la tienda");
    }
  }

  // Método para verificar si existe un empleado con el mismo teléfono o correo
  async validateUniqueContact(telefono: string, correo: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM empleados WHERE telefono = ? OR correo = ?";
      const params: any[] = [telefono, correo];
      const [result]: any = await query(sql, params);

      // Devuelve true si se encuentra algún empleado con esos datos
      return result.length > 0;
    } catch (error) {
      console.error("Error al verificar la existencia del empleado:", error);
      throw new Error("Error al verificar la existencia del empleado");
    }
  }

  // Crear un nuevo empleado
  async createEmpleado(
    nombre: string,
    telefono: string,
    correo: string,
    puesto: string,
    tiendaCorreo: string
  ): Promise<Empleado | null> {
    try {
      // Verificar si ya existe un empleado con el mismo teléfono o correo
      const empleadoExistente = await this.validateUniqueContact(telefono, correo);
      if (empleadoExistente) {
        throw new Error("El empleado con el mismo número de teléfono o correo ya está registrado.");
      }

      const sql = "INSERT INTO empleados (nombre, telefono, correo, puesto, tiendaCorreo) VALUES (?, ?, ?, ?, ?)";
      const params: any[] = [nombre, telefono, correo, puesto, tiendaCorreo];
      const [result]: any = await query(sql, params);
      
      return new Empleado(result.insertId, nombre, telefono, correo, puesto, tiendaCorreo);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en createEmpleado:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Error desconocido en createEmpleado");
        throw new Error("Error desconocido al crear el empleado");
      }
    }
  }

  // Obtener un empleado por su ID
  async getById(empleadoId: string): Promise<Empleado | null> {
    try {
      const sql = "SELECT * FROM empleados WHERE id = ?";
      const params: any[] = [empleadoId];
      const result: any = await query(sql, params);
      const empleado = result[0][0];
      
      return empleado
        ? new Empleado(empleado.id, empleado.nombre, empleado.telefono, empleado.correo, empleado.puesto, empleado.tiendaCorreo)
        : null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en getById:", error.message);
        throw new Error("Error al obtener el empleado");
      } else {
        console.error("Error desconocido en getById");
        throw new Error("Error desconocido al obtener el empleado");
      }
    }
  }

  // Obtener todos los empleados
  async getAll(): Promise<Empleado[] | null> {
    try {
      const sql = "SELECT * FROM empleados";
      const [data]: any = await query(sql, []);
      const dataEmpleados = Object.values(JSON.parse(JSON.stringify(data)));
      
      return dataEmpleados.map(
        (empleado: any) =>
          new Empleado(empleado.id, empleado.nombre, empleado.telefono, empleado.correo, empleado.puesto, empleado.tiendaCorreo)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en getAll:", error.message);
        throw new Error("Error al obtener todos los empleados");
      } else {
        console.error("Error desconocido en getAll");
        throw new Error("Error desconocido al obtener todos los empleados");
      }
    }
  }

  // Eliminar un empleado por su ID
  async deleteEmpleado(empleadoId: string): Promise<boolean> {
    try {
      const sql = "DELETE FROM empleados WHERE id = ?";
      const params: any[] = [empleadoId];
      const [result]: any = await query(sql, params);
      
      return result.affectedRows > 0;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en deleteEmpleado:", error.message);
        throw new Error("Error al eliminar el empleado");
      } else {
        console.error("Error desconocido en deleteEmpleado");
        throw new Error("Error desconocido al eliminar el empleado");
      }
    }
  }

  // Actualizar los datos de un empleado
  async updateEmpleado(
    id: string,
    nombre?: string,
    telefono?: string,
    correo?: string,
    puesto?: string
  ): Promise<Empleado | null> {
    try {
      const fieldsToUpdate: string[] = [];
      const params: any[] = [];

      if (nombre) {
        fieldsToUpdate.push("nombre = ?");
        params.push(nombre);
      }
      if (telefono) {
        fieldsToUpdate.push("telefono = ?");
        params.push(telefono);
      }
      if (correo) {
        fieldsToUpdate.push("correo = ?");
        params.push(correo);
      }
      if (puesto) {
        fieldsToUpdate.push("puesto = ?");
        params.push(puesto);
      }

      params.push(id);
      const sql = `UPDATE empleados SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

      const [result]: any = await query(sql, params);
      if (result.affectedRows === 0) return null;

      const updatedEmpleado: any = await this.getById(id);
      return updatedEmpleado;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en updateEmpleado:", error.message);
        throw new Error("Error al actualizar el empleado");
      } else {
        console.error("Error desconocido en updateEmpleado");
        throw new Error("Error desconocido al actualizar el empleado");
      }
    }
  }
}
