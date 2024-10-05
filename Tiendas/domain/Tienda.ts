export class Tienda {
  constructor(
      readonly id: string,
      readonly nombre: string,
      readonly direccion: string,
      readonly telefono: string,
      readonly correo: string,
      readonly descripcion: string,
      readonly userCorreo: string,  // Correo del usuario propietario
      readonly horario: string,  // Horario de apertura y cierre
      readonly estado: string    // Estado de la tienda (abierta, cerrada, etc.)
  ) {}
}
