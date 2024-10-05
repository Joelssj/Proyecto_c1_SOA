import { Tienda } from "../../domain/Tienda";
import { query } from "../../../database/mysql/mysql";
import { TiendaRepository } from "../../domain/TiendaRepository";

export class MysqlTiendaRepository implements TiendaRepository {

  // Obtener todas las tiendas asociadas a un usuario específico por su correo
  async getAllByUserCorreo(userCorreo: string): Promise<Tienda[] | null> {
    try {
      const sql = "SELECT * FROM tiendas WHERE userCorreo = ?";
      const params: any[] = [userCorreo];
      const [result]: any = await query(sql, params);

      if (result.length === 0) {
        return null; 
      }

      return result.map((tienda: any) => 
        new Tienda(
          tienda.id,
          tienda.nombre,
          tienda.direccion,
          tienda.telefono,
          tienda.correo,
          tienda.descripcion,
          tienda.userCorreo,
          tienda.horario,
          tienda.estado
        )
      );
    } catch (error) {
      console.error("Error al obtener tiendas del usuario:", error);
      throw new Error("Error al obtener las tiendas del usuario");
    }
  }


  async validateDuplicate(
    nombre: string,
    telefono: string,
    descripcion: string,
    correo: string
  ): Promise<boolean> {
    try {
      const sql = "SELECT * FROM tiendas WHERE nombre = ? OR telefono = ? OR descripcion = ? OR correo = ?";
      const params: any[] = [nombre, telefono, descripcion, correo];
      const [result]: any = await query(sql, params);


      return result.length > 0;
    } catch (error) {
      console.error("Error al verificar la existencia de la tienda:", error);
      throw new Error("Error al verificar la existencia de la tienda");
    }
  }


  async createTienda(
    nombre: string,
    direccion: string,
    telefono: string,
    correo: string,
    descripcion: string,
    userCorreo: string,
    horario: string,
    estado: string
  ): Promise<Tienda | null> {
    try {

      const tiendaExistente = await this.validateDuplicate(nombre, telefono, descripcion, correo);
      if (tiendaExistente) {
        throw new Error("La tienda con el mismo nombre, número de teléfono, descripción, correo ya está registrada.");
      }

      const sql = "INSERT INTO tiendas (nombre, direccion, telefono, correo, descripcion, userCorreo, horario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const params: any[] = [nombre, direccion, telefono, correo, descripcion, userCorreo, horario, estado];
      const [result]: any = await query(sql, params);
      
      return new Tienda(result.insertId, nombre, direccion, telefono, correo, descripcion, userCorreo, horario, estado);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en createTienda:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Error desconocido en createTienda");
        throw new Error("Error desconocido al crear la tienda");
      }
    }
  }


  async getById(tiendaId: string): Promise<Tienda | null> {
    try {
      const sql = "SELECT * FROM tiendas WHERE id = ?";
      const params: any[] = [tiendaId];
      const result: any = await query(sql, params);
      const tienda = result[0][0];
      
      return tienda
        ? new Tienda(tienda.id, tienda.nombre, tienda.direccion, tienda.telefono, tienda.correo, tienda.descripcion, tienda.userCorreo, tienda.horario, tienda.estado)
        : null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en getById:", error.message);
        throw new Error("Error al obtener la tienda");
      } else {
        console.error("Error desconocido en getById");
        throw new Error("Error desconocido al obtener la tienda");
      }
    }
  }


  async getAll(): Promise<Tienda[] | null> {
    try {
      const sql = "SELECT * FROM tiendas";
      const [data]: any = await query(sql, []);
      const dataTiendas = Object.values(JSON.parse(JSON.stringify(data)));
      
      return dataTiendas.map(
        (tienda: any) =>
          new Tienda(tienda.id, tienda.nombre, tienda.direccion, tienda.telefono, tienda.correo, tienda.descripcion, tienda.userCorreo, tienda.horario, tienda.estado)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en getAll:", error.message);
        throw new Error("Error al obtener todas las tiendas");
      } else {
        console.error("Error desconocido en getAll");
        throw new Error("Error desconocido al obtener todas las tiendas");
      }
    }
  }


  async deleteTienda(tiendaId: string): Promise<boolean> {
    try {
      const sql = "DELETE FROM tiendas WHERE id = ?";
      const params: any[] = [tiendaId];
      const [result]: any = await query(sql, params);
      
      return result.affectedRows > 0;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en deleteTienda:", error.message);
        throw new Error("Error al eliminar la tienda");
      } else {
        console.error("Error desconocido en deleteTienda");
        throw new Error("Error desconocido al eliminar la tienda");
      }
    }
  }


  async updateTienda(
    id: string,
    nombre?: string,
    direccion?: string,
    telefono?: string,
    correo?: string,
    descripcion?: string,
    horario?: string,
    estado?: string
  ): Promise<Tienda | null> {
    try {
      const fieldsToUpdate: string[] = [];
      const params: any[] = [];

      if (nombre) {
        fieldsToUpdate.push("nombre = ?");
        params.push(nombre);
      }
      if (direccion) {
        fieldsToUpdate.push("direccion = ?");
        params.push(direccion);
      }
      if (telefono) {
        fieldsToUpdate.push("telefono = ?");
        params.push(telefono);
      }
      if (correo) {
        fieldsToUpdate.push("correo = ?");
        params.push(correo);
      }
      if (descripcion) {
        fieldsToUpdate.push("descripcion = ?");
        params.push(descripcion);
      }
      if (horario) {
        fieldsToUpdate.push("horario = ?");
        params.push(horario);
      }
      if (estado) {
        fieldsToUpdate.push("estado = ?");
        params.push(estado);
      }

      params.push(id);
      const sql = `UPDATE tiendas SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

      const [result]: any = await query(sql, params);
      if (result.affectedRows === 0) return null;

      const updatedTienda: any = await this.getById(id);
      return updatedTienda;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en updateTienda:", error.message);
        throw new Error("Error al actualizar la tienda");
      } else {
        console.error("Error desconocido en updateTienda");
        throw new Error("Error desconocido al actualizar la tienda");
      }
    }
  }
}
