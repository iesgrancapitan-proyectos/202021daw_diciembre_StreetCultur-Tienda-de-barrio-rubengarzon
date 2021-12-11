export class Pedido {
  constructor(
    public id: number,
    public fecha: Date,
    public nombre: string,
    public estado: string,
    public preciototal: number,
    public fechaenvio: string,
    public fecharecibido: string,
    public idcliente: number,
    public email: string
  ) {}
}
