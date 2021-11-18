export class Pedido {
  constructor(
    public id: number,
    public fecha: Date,
    public nombre: string,
    public estado: string,
    public idcliente: number
  ) {}
}
