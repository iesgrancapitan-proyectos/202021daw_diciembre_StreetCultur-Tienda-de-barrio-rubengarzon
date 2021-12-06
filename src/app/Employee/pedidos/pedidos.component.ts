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
  form1: FormGroup;

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
    imagen: null,
  };

  formEstado = new FormGroup({
    estado: new FormControl(''),
  });

  formModal = new FormGroup({
    id: new FormControl(''),
    estado: new FormControl(''),
    preciototal: new FormControl(''),
    fechaenvio: new FormControl(''),
    fecharecibido: new FormControl(''),
  });
  constructor(
    private login: LoginComponent,
    private pedidoServicio: PedidoService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      imagen: new FormControl(),
    });
    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };
    if (this.estaLogueado) {
      this.obtenerDatos();
      let cliente = {
        idcliente: sessionStorage.getItem('id'),
      };
      let email = sessionStorage.getItem('email');
      let email1 = { email: email };
      this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
        this.form1.setValue({
          id: sessionStorage.getItem('id'),
          nombre: datos['cliente'][0]['nombre'],
          apellidos: datos['cliente'][0]['apellidos'],
          provincia: datos['cliente'][0]['provincia'],
          localidad: datos['cliente'][0]['localidad'],
          imagen: datos['cliente'][0]['imagen'],
        });
      });
    }
    this.pedidoServicio.obtenerPedidos().subscribe((datos) => {
      this.pedido = datos['pedidos'];
    });
  }

  actualizarInfo() {
    console.log(this.form1.value);
    this.clienteServicio
      .actualizarCliente(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.obtenerDatos();
          this.snackBar.open('Se ha actualizado la información', '', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 2000,
          });
        }
      });
  }

  obtenerDatos() {
    let email = sessionStorage.getItem('email');
    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
        this.cliente.perfil = datos['cliente'][0]['perfil'];
        this.cliente.nombre = datos['cliente'][0]['nombre'];
        this.cliente.apellidos = datos['cliente'][0]['apellidos'];
        this.cliente.provincia = datos['cliente'][0]['provincia'];
        this.cliente.localidad = datos['cliente'][0]['localidad'];
        this.cliente.domicilio = datos['cliente'][0]['domicilio'];
        this.cliente.codigopostal = datos['cliente'][0]['codigopostal'];
        this.cliente.movil = datos['cliente'][0]['movil'];
        this.cliente.imagen = datos['cliente'][0]['imagen'];
    });
  }

  pasarDatos(id, estado, preciototal, fechaenvio, fecharecibido) {
    console.log(id);
    this.formModal.setValue({
      id: id,
      estado: estado,
      preciototal: preciototal,
      fechaenvio: fechaenvio,
      fecharecibido: fecharecibido,
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

  modificarPedido() {
    this.pedidoServicio
      .actualizarPedido(this.formModal.value)
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
