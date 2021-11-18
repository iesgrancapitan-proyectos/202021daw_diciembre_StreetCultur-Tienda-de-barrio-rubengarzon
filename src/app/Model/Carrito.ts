export class Carrito {
  constructor(
    public id: number,
    public nombre: string,
    public cantidad: number,
    public imagen: string,
    public precio: number,
    public idcliente: number
  ) {}
}
