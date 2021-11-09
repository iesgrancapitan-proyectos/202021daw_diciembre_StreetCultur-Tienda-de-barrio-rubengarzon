import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/Model/Pedido';
import { PedidoService } from 'src/app/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedido: Pedido[] = [];

  constructor(private pedidoServicio:PedidoService) { }

  ngOnInit() {
  }

  /* insertarPedido(pedido: any) {
    this.pedidoServicio.hacerPedido(pedido);
  } */

}
