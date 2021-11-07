export class Pedido {
  constructor(
    public Id: number,
    public Fecha: Date,
    public Nombre: string,
    public Estado: string
  ) {}
}
