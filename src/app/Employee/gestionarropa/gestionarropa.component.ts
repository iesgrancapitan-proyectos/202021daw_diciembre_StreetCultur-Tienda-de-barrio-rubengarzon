import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RopaService } from 'src/app/ropa.service';
import { Ropa } from 'src/app/Model/Ropa';

@Component({
  selector: 'app-gestionarropa',
  templateUrl: './gestionarropa.component.html',
  styleUrls: ['./gestionarropa.component.sass'],
})
export class GestionarRopaComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  estado: any;

  id: any;

  clientes: any;

  hayPedidos = false;

  ropa: Ropa[] = [];

  constructor(
    private login: LoginComponent,
    private ropaServicio: RopaService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.ropaServicio.obtenerRopa().subscribe((datos) => {
      this.ropa = datos['ropa'];
    });
  }

  borrarRopa(id: any) {
    let ropa = {
      Id: id,
    };
    let cliente = {
      id: idpedido,
    };
    this.pedidoServicio.borrarPedido(pedido).subscribe((datos) => {
      this.pedidoServicio.obtenerPedido(cliente).subscribe((datos: any) => {
        this.pedido = datos['pedido'];
        if (this.pedido.length > 0) {
          this.hayPedidos = true;
        } else {
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
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  /* modificarPedido(id, estado) {
    console.log(estado);
    let pedido = {
      id: id,
      estado: estado,
    };
    this.pedidoServicio.actualizarPedido(pedido).subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        this.snackBar.open('El pedido se ha modificado', '', {
          duration: 2000,
        });
      } else {
        alert('error');
      }
    });
  } */
}
