export class Empleado {
  constructor(
    readonly id: string,
    readonly nombre: string,
    readonly telefono: string,
    readonly correo: string,
    readonly puesto: string,
    readonly tiendaCorreo: string  // Correo de la tienda asociada
  ) {}
}
