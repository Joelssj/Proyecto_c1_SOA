import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { WhatsAppRepository } from '../../domain/WhatsAppRepository';

export class WhatsAppAdapter implements WhatsAppRepository {
    private client: Client;
    private isReady: boolean = false;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
        });

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
            console.log('Código QR generado, escanéalo con tu teléfono.');
        });

        this.client.on('ready', () => {
            console.log('WhatsApp conectado correctamente');
            this.isReady = true;
        });

        this.client.on('auth_failure', (message) => {
            console.error('Error de autenticación:', message);
            this.isReady = false;
        });

        this.client.on('disconnected', (reason) => {
            console.log('Cliente de WhatsApp desconectado:', reason);
            this.isReady = false;

            setTimeout(() => {
                console.log('Intentando reconectar...');
                this.client.initialize();
            }, 10000);
        });

        this.client.initialize();
    }

    async sendMessage(to: string, message: string): Promise<void> {
        if (!this.isReady) {
            throw new Error('WhatsApp Web no está listo. Intenta de nuevo más tarde.');
        }

        try {
            const cleanNumber = to.replace(/[^\d]/g, ''); 


            let formattedNumber = cleanNumber;
            if (!cleanNumber.startsWith('52')) { 
                formattedNumber = `52${cleanNumber}`;
            }


            const whatsappNumber = `${formattedNumber}@c.us`;

            const contact = await this.client.getNumberId(whatsappNumber);

            if (!contact) {
                throw new Error(`El número ${whatsappNumber} no está registrado en WhatsApp.`);
            }


            await this.client.sendMessage(contact._serialized, message);
            console.log('Mensaje enviado correctamente a:', whatsappNumber);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            throw new Error('Error al enviar el mensaje de WhatsApp');
        }
    }
}
