import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  pedido: Pedido[] = [];

  estado:any;

  id:any;

  clientes:any

  hayPedidos = false;

  constructor(private pedidoServicio: PedidoService, private clienteServicio: ClienteService, readonly snackBar: MatSnackBar) {}

  ngOnInit() {
    this.clienteServicio.mostrarIdClientes().subscribe((datos) => {
      for (const key in datos['clientes']) {
        this.clientes = datos['clientes'];
      }
    })
  }

  mostrarPedido(id:any) {
    let cliente = {
      id: id
    }
    this.pedidoServicio.obtenerPedido(cliente).subscribe((datos: any) => {
      this.pedido = datos['pedido'];
      if(this.pedido.length > 0){
        this.hayPedidos = true;
      }else{
        this.hayPedidos = false;
      }

    });
  }

  borrarPedido(id:any,idpedido:any){
    let pedido = {
      id: id
    }
    let cliente = {
      id: idpedido
    }
    this.pedidoServicio.borrarPedido(pedido).subscribe((datos) => {
      this.pedidoServicio.obtenerPedido(cliente).subscribe((datos: any) => {
        this.pedido = datos['pedido'];
        if(this.pedido.length > 0){
          this.hayPedidos = true;
        }else{
          this.hayPedidos = false;
        }
      });
      return this.snackBar.open('Se ha borrado el pedido.', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1500,
      });
    });
  }
}
