import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from 'src/app/incidencia.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Incidencia } from 'src/app/Model/Incidencia';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/cliente.service';


@Component({
  selector: 'app-gestionar-incidencias',
  templateUrl: './gestionar-incidencias.component.html',
  styleUrls: ['./gestionar-incidencias.component.sass'],
})
export class GestionarIncidenciasComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  incidencias: Incidencia[] = [];

  hayIncidencias = false;

  numIncidencias: any;

  form1: FormGroup;

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  constructor(
    public dialog: MatDialog,
    readonly snackBar: MatSnackBar,
    private login: LoginComponent,
    private incidenciasServicio: IncidenciaService,
    private clienteServicio: ClienteService
  ) {}

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

  ngOnInit() {
    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        if (datos['incidencias']['length'] > 0) {
          this.hayIncidencias = true;
          this.incidencias = datos['incidencias'];
        } else {
          this.hayIncidencias = false;
        }
      } else {
        console.log('error');
      }
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

    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      this.numIncidencias = datos['incidencias']['length'];
    });
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

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
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

  borrarIncidencias(id) {
    let incidencia = {
      id: id,
    };
    this.incidenciasServicio
      .borrarIncidencias(incidencia)
      .subscribe((datos) => {
        this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
          if (datos['incidencias']['length'] > 0) {
            this.incidencias = datos['incidencias'];
            this.hayIncidencias = true;
          } else {
            this.hayIncidencias = false;
          }
        });
        this.snackBar.open('La incidencia se ha borrado', '', {
          duration: 6000,
        });
      });
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((datos) => {
      if (datos == true) {
        this.borrarIncidencias(id);
      }
    });
  }
}

@Component({
  selector: 'dialogo',
  templateUrl: 'dialogo.html',
})
export class DialogOverviewExampleDialog1 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
