import bcrypt from "bcrypt";
import { Users } from "../../domain/Users";
import { query } from "../../../database/mysql/mysql";
import { UsersRepository } from "../../domain/UsersRepository";

export class MysqlUsersRepository implements UsersRepository {

    async login(correo: string, password: string): Promise<Users | null> {
        try {
            const sql = "SELECT * FROM users WHERE correo = ?";
            const params: any[] = [correo]; 
            const result: any = await query(sql, params);
            const user = result[0][0];

            if (user && await bcrypt.compare(password, user.password)) {
                return new Users(user.id, user.nombre, user.correo, user.password, user.numero);
            }

            return null;  // Contraseña incorrecta o usuario no encontrado
        } catch (error) {
            console.error("Error en login:", error);
            throw new Error("Error en el proceso de login");
        }
    }

    // Crear un nuevo usuario con hasheo de contraseña
    async createUsers(
        nombre: string,
        correo: string,
        password: string,
        numero: string 
    ): Promise<Users | null> {
        try {
            // Verificar si el correo ya existe
            const existingUser = await this.getByEmail(correo);
            if (existingUser) {
                throw new Error("El correo ya está registrado");
            }

            // Validar longitud y fortaleza de la contraseña
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error("La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo");
            }

            // Hashear la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = "INSERT INTO users (nombre, correo, password, numero) VALUES (?, ?, ?, ?)";
            const params: any[] = [nombre, correo, hashedPassword, numero]; 
            const [result]: any = await query(sql, params);

            return new Users(result.insertId, nombre, correo, hashedPassword, numero);
        } catch (error) {
            console.error("Error en createUsers:", error);
            throw new Error("Error al crear usuario");
        }
    }

    // Implementación de getByEmail
    async getByEmail(correo: string): Promise<Users | null> {
        try {
            const sql = "SELECT * FROM users WHERE correo = ?";
            const params: any[] = [correo];
            const [result]: any = await query(sql, params);

            if (result.length === 0) {
                return null;  
            }

            const user = result[0];
            return new Users(user.id, user.nombre, user.correo, user.password, user.numero);
        } catch (error) {
            console.error("Error al obtener usuario por correo:", error);
            return null;
        }
    }

    // Obtener un usuario por su ID
    async getById(id: string): Promise<Users | null> {
        try {
            const sql = "SELECT * FROM users WHERE id=?";
            const params: any[] = [id];
            const result: any = await query(sql, params);
            const user = result[0][0];
            return user ? new Users(user.id, user.nombre, user.correo, user.password, user.numero) : null;
        } catch (error) {
            console.error("Error en getById:", error);
            throw new Error("Error al obtener usuario");
        }
    }

    // Obtener todos los usuarios
    async getAll(): Promise<Users[] | null> {
        try {
            const sql = "SELECT * FROM users";
            const [data]: any = await query(sql, []);
            const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
            return dataUsers.map(
                (user: any) =>
                    new Users(user.id, user.nombre, user.correo, user.password, user.numero)
            );
        } catch (error) {
            console.error("Error en getAll:", error);
            throw new Error("Error al obtener todos los usuarios");
        }
    }

    // Eliminar un usuario por su ID
    async deleteUser(userId: string): Promise<boolean> {
        try {
            const sql = "DELETE FROM users WHERE id=?";
            const params: any[] = [userId];
            const [result]: any = await query(sql, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error en deleteUser:", error);
            throw new Error("Error al eliminar el usuario");
        }
    }

    // Actualizar los datos de un usuario
    async updateUsers(id: string, nombre?: string, correo?: string, password?: string, numero?: string): Promise<Users | null> {
        try {
            const fieldsToUpdate: string[] = [];
            const params: any[] = [];

            if (nombre) {
                fieldsToUpdate.push("nombre = ?");
                params.push(nombre);
            }
            if (correo) {
                fieldsToUpdate.push("correo = ?");
                params.push(correo);
            }
            if (password) {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(password)) {
                    throw new Error("La nueva contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo");
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                fieldsToUpdate.push("password = ?");
                params.push(hashedPassword);
            }
            if (numero) {
                fieldsToUpdate.push("numero = ?");
                params.push(numero);
            }

            params.push(id);
            const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

            const [result]: any = await query(sql, params);
            if (result.affectedRows === 0) return null;

            const updatedUser: any = await this.getById(id);
            return updatedUser;
        } catch (error) {
            console.error("Error en updateUsers:", error);
            throw new Error("Error al actualizar el usuario");
        }
    }
}


