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
  cliente: Cliente[] = [];

  constructor(private pedidoServicio: PedidoService, private clienteServicio: ClienteService) {}

  ngOnInit() {
    //this.mostrarPedido();
  }

  mostrarPedido() {
    /*this.pedidoServicio.obtenerPedido().subscribe((datos: any) => {
      this.pedido = datos['pedido'];
    });
    let email = sessionStorage.getItem("email");
    let objEmail = {Email : email};
    this.clienteServicio.mostrarCliente(objEmail).subscribe((datos: any) => {
      this.cliente = datos['cliente'];
    }); */
  }
}
