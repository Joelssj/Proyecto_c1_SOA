import { UsersRepository } from "../domain/UsersRepository";
import { WhatsAppRepository } from "../../WhatsApp/domain/WhatsAppRepository"; 
import { Users } from "../domain/Users";

export class CreateUsersUseCase {
    constructor(
        readonly usersRepository: UsersRepository,
        readonly whatsappRepository: WhatsAppRepository 
    ) {}

    async run(
        nombre: string,
        correo: string,
        password: string,
        numero: string 
    ): Promise<Users | null> {

        const existingUser = await this.usersRepository.getByEmail(correo);
        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }


        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo");
        }


        const formattedNumber = this.formatPhoneNumber(numero);
        if (!formattedNumber) {
            throw new Error("El número proporcionado no es válido. Asegúrate de usar el formato internacional.");
        }


        try {
            await this.whatsappRepository.sendMessage(formattedNumber, "¡Bienvenido!");
        } catch (error) {
            throw new Error("El número proporcionado no es válido en WhatsApp");
        }


        try {
            const user = await this.usersRepository.createUsers(nombre, correo, password, numero);
            

            const message = `Hola ${nombre}, tu registro ha sido exitoso.`;
            await this.whatsappRepository.sendMessage(formattedNumber, message);

            return user;
        } catch (error) {
            throw new Error("Error al crear el usuario");
        }
    }


    private formatPhoneNumber(phoneNumber: string): string | null {
        let cleanedNumber = phoneNumber.replace(/\D/g, "");


        if (!cleanedNumber.startsWith("52")) {
            cleanedNumber = `52${cleanedNumber}`;
        }

        const phoneRegex = /^[0-9]{12,15}$/;
        if (phoneRegex.test(cleanedNumber)) {
            return `${cleanedNumber}@c.us`; 
        }

        return null;
    }
}
