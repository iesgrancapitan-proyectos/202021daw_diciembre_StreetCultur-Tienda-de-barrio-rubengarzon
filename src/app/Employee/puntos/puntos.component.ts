import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PuntosService } from 'src/app/puntos.service';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.sass'],
})
export class GestionarPuntosComponent implements OnInit {
  puntos = {
    id: null,
    puntos: null,
    idcliente: null,
  };

  estaLogueado: boolean = this.login.estaLogueado();

  estado: any;

  id: any;

  clientes: any;

  constructor(
    private login: LoginComponent,
    private puntosServicio: PuntosService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.clienteServicio.mostrarIdClientes().subscribe((datos) => {
      for (const key in datos['clientes']) {
        this.clientes = datos['clientes'];
      }
    });
  }

  mostrarPuntos(id: any) {
    let cliente = {
      idcliente: id,
    };
    this.puntosServicio.obtenerPuntos(cliente).subscribe((datos: any) => {
      this.puntos.id = datos['id'];
      this.puntos.puntos = datos['puntos'];
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

 modificarPuntos(id, puntos) {
    let puntoss = {
      id: id,
      puntos: puntos,
    };
    this.puntosServicio.actualizarPuntos(puntoss).subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        this.snackBar.open('Los puntos se han modificado', '', {
          duration: 2000,
        });
      } else {
        alert('error');
      }
    });
  }
}
