import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  pedido: Pedido[] = [];

  estado:any;

  constructor(private pedidoServicio: PedidoService) {}

  ngOnInit() {
    this.mostrarPedido();
  }

  mostrarPedido() {
    let cliente = {
      id: sessionStorage.getItem("id")
    }
    this.pedidoServicio.obtenerPedido(cliente).subscribe((datos: any) => {
      this.pedido = datos['pedido'];
    });
  }

  borrarPedido(id:any){
  }
}
