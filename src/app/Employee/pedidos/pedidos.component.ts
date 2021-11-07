import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/Model/Pedido';
import { PedidoService } from 'src/app/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  pedido: Pedido[] = [];

  constructor(private pedidoServicio: PedidoService) {}

  ngOnInit() {
    this.mostrarPedido();
  }

  mostrarPedido() {
    this.pedidoServicio.obtenerPedido().subscribe((datos: any) => {
      this.pedido = datos['pedido'];
    });
  }
}
