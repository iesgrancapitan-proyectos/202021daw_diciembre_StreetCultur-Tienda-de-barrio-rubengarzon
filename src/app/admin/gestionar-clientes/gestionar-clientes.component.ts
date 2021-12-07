import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { Cliente } from 'src/app/Model/Cliente';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IncidenciaService } from 'src/app/incidencia.service';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.sass'],
})
export class GestionarClientesComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();
  numIncidencias: any;
  clientes: Cliente[] = [];

  modificarCliente1 = new FormGroup({
    perfil: new FormControl(''),
    email: new FormControl(''),
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    provincia: new FormControl(''),
    localidad: new FormControl(''),
    domicilio: new FormControl(''),
    codigopostal: new FormControl(''),
    movil: new FormControl(''),
  });

  formAddCliente = new FormGroup({
    perfil: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  clientes1 = {
    id: null,
    perfil: null,
    email: null,
    password: null,
    nombre: null,
    apellidos: null,
    provincia: null,
    localidad: null,
    domicilio: null,
    codigopostal: null,
    movil: null,
  };

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

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

  constructor(
    private login: LoginComponent,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog,
    private incidenciasServicio: IncidenciaService
  ) {}

  ngOnInit() {
    this.mostrarCliente();
    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      this.numIncidencias = datos['incidencias']['length'];
    });
  }

  get email(){return this.formAddCliente.get('email')}

  mostrarCliente() {
    this.clienteServicio.mostrarClientes().subscribe((datos) => {
      this.clientes = datos['clientes'];
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  pasarDatos(email) {
    let email1 = {
      email: email,
    };
    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      this.modificarCliente1.setValue({
        id: datos['cliente'][0]['id'],
        perfil: datos['cliente'][0]['perfil'],
        email: datos['cliente'][0]['email'],
        nombre: datos['cliente'][0]['nombre'],
        apellidos: datos['cliente'][0]['apellidos'],
        provincia: datos['cliente'][0]['provincia'],
        localidad: datos['cliente'][0]['localidad'],
        domicilio: datos['cliente'][0]['domicilio'],
        codigopostal: datos['cliente'][0]['codigopostal'],
        movil: datos['cliente'][0]['movil'],
      });
    });
  }

  modificarCliente() {
    this.clienteServicio
      .actualizarCliente(this.modificarCliente1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.snackBar.open('El cliente se ha modificado', '', {
            duration: 6000,
          });
          this.clienteServicio.mostrarClientes().subscribe((datos) => {
            this.clientes = datos['clientes'];
          });
        }
      });
  }
  openDialog(email) {
    let email1 = {
      email: email,
    };

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((datos) => {
      if (datos == true) {
        this.clienteServicio.borrarCliente(email1).subscribe((datos) => {
          if (datos['resultado'] == 'OK') {
            this.mostrarCliente();
          }
        });
      }
    });
  }

  addCliente() {
    this.clienteServicio
      .insertarUsuario(this.formAddCliente.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.snackBar.open('Se ha creado el usuario', '', {
            duration: 6000,
          });
          this.mostrarCliente();
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
  }
}

@Component({
  selector: 'dialogo',
  templateUrl: 'dialogo.html',
})
export class DialogOverviewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
