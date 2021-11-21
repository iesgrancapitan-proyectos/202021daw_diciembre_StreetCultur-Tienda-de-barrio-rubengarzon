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
    this.ropaServicio.borrarRopa(ropa).subscribe((datos) => {
        this.ropaServicio.obtenerRopa().subscribe((datos: any) => {
          this.ropa = datos['ropa'];
        });
        return this.snackBar.open('Se ha borrado la ropa.', '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
    })
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  modificarRopa(id, nombre, descripcion, precio, color) {
    let ropa = {
      Id: id,
      Nombre: nombre,
      Descripcion: descripcion,
      Precio: precio,
      Color: color
    };
    this.ropaServicio.actualizarRopa(ropa).subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        this.snackBar.open('La ropa se ha modificado', '', {
          duration: 2000,
        });
      } else {
        alert('error');
      }
    });
  }
}
