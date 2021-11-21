export class Pedido {
  constructor(
    public id: number,
    public fecha: Date,
    public nombre: string,
    public estado: string,
    public preciototal: number,
    public fechadeenvio: string,
    public fechaderecibo: string,
    public idcliente: number
  ) {}
}
