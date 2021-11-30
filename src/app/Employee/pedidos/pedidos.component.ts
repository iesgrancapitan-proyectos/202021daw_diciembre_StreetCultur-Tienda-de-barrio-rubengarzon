import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.sass'],
})
export class PedidosComponent implements OnInit {
  showFiller = false;

  pedido: Pedido[] = [];

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  estaLogueado: boolean = this.login.estaLogueado();

  estado: any;

  id: any;

  cliente = {
    id: sessionStorage.getItem('id'),
    email: sessionStorage.getItem('email'),
    perfil: null,
    fecha: this.hoy,
    nombre: null,
    apellidos: null,
    provincia: null,
    localidad: null,
    domicilio: null,
    codigopostal: null,
    movil: null,
    imagen: null
  };

  /* hayPedidos = false; */

  formEstado = new FormGroup({
    estado: new FormControl(''),
  });

  formModal = new FormGroup({
    id: new FormControl(''),
    estado: new FormControl(''),
    preciototal: new FormControl(''),
    fechadeenvio: new FormControl(''),
    fechaderecibo: new FormControl(''),
  });

  constructor(
    private login: LoginComponent,
    private pedidoServicio: PedidoService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    /* this.clienteServicio.mostrarIdClientes().subscribe((datos) => {
      for (const key in datos['clientes']) {
        this.clientes = datos['clientes'];
      }
    }); */
    this.pedidoServicio.obtenerPedidos().subscribe((datos) => {
      this.pedido = datos['pedidos'];
    });
  }

  obtenerDatos() {
    let email = sessionStorage.getItem('email');
    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      if (
        datos['cliente'][0]['nombre'] != null &&
        datos['cliente'][0]['domicilio'] != null &&
        datos['cliente'][0]['codigopostal'] &&
        datos['cliente'][0]['movil']
      ) {
        this.cliente.perfil = datos['cliente'][0]['perfil'];
        this.cliente.nombre = datos['cliente'][0]['nombre'];
        this.cliente.apellidos = datos['cliente'][0]['apellidos'];
        this.cliente.provincia = datos['cliente'][0]['provincia'];
        this.cliente.localidad = datos['cliente'][0]['localidad'];
        this.cliente.domicilio = datos['cliente'][0]['domicilio'];
        this.cliente.codigopostal = datos['cliente'][0]['codigopostal'];
        this.cliente.movil = datos['cliente'][0]['movil'];
        this.cliente.imagen = datos['cliente'][0]['imagen'];
      }
    });
  }

  /* mostrarPedido(id: any) {
    let cliente = {
      id: id,
    };
    this.pedidoServicio.obtenerPedido(cliente).subscribe((datos: any) => {
      this.pedido = datos['pedido'];
      if (this.pedido.length > 0) {
        this.hayPedidos = true;
      } else {
        this.hayPedidos = false;
      }
    });
  } */
  pasarDatos(id, estado, preciototal) {
    this.formModal.setValue({
      id: id,
      estado: estado,
      preciototal: preciototal,
      fechadeenvio: '2021-02-02',
      fechaderecibo: '2021-02-03',
    });
  }
  borrarPedido(id: any, idpedido: any) {
    let pedido = {
      id: id,
    };
    let cliente = {
      id: idpedido,
    };
    this.pedidoServicio.borrarPedido(pedido).subscribe((datos) => {
      this.pedidoServicio.obtenerPedido(cliente).subscribe((datos: any) => {
        this.pedido = datos['pedido'];
        /* if (this.pedido.length > 0) {
          this.hayPedidos = true;
        } else {
          this.hayPedidos = false;
        } */
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

  modificarPedido(id) {

    console.log(this.formEstado.get("estado"));

    let pedido = {
      id:id,
      estado:this.formEstado.get("estado")
    }
    this.pedidoServicio
      .actualizarPedido(pedido)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.pedidoServicio.obtenerPedidos().subscribe((datos) => {
            this.pedido = datos['pedidos'];
          });
          this.snackBar.open('El pedido se ha modificado', '', {
            duration: 2000,
          });
        } else {
          alert('error');
        }
      });
  }

  openDialog(id) {
    let id1 = {
      id: id,
    };

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((datos) => {
      if (datos == true) {
        this.pedidoServicio.borrarPedido(id1).subscribe((datos) => {
          if (datos['resultado'] == 'OK') {
            this.pedidoServicio.obtenerPedidos().subscribe((datos) => {
              this.pedido = datos['pedidos'];
            });
          }
        });
      }
    });
  }
}
@Component({
  selector: 'dialogo',
  templateUrl: 'dialogo.html',
})
export class DialogOverviewExampleDialog2 {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
