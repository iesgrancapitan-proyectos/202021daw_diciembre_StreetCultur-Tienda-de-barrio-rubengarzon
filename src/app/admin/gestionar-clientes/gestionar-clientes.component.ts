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
  form1: FormGroup;

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
          domicilio: datos['cliente'][0]['domicilio'],
          imagen: datos['cliente'][0]['imagen'],
        });
      });
    }
    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      domicilio: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
    });
  }

  get email() {
    return this.formAddCliente.get('email');
  }

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
  actualizarInfo() {
    this.clienteServicio
      .actualizarCliente(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.obtenerDatos();
          this.snackBar.open('Información Actualizada', '', {
            duration: 6000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
  }
  obtenerDatos() {
    console.log('holaaa');

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

  mostrarClientes() {
    this.clienteServicio.mostrarClientess().subscribe((datos) => {
      this.clientes = datos['clientes'];
    });
  }

  mostrarEmpleados() {
    this.clienteServicio.mostrarEmpleados().subscribe((datos) => {
      this.clientes = datos['clientes'];
    });
  }

  mostrarAdmin() {
    this.clienteServicio.mostrarAdmin().subscribe((datos) => {
      this.clientes = datos['clientes'];
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
