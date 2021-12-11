import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { IncidenciaService } from '../incidencia.service';
import { LoginComponent } from '../main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  numClientes: any;
  numIncidencias: any;
  form1: FormGroup;
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
    private clientesServicio: ClienteService,
    private incidenciasServicio: IncidenciaService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    let email = sessionStorage.getItem('email');
    let email1 = { email: email };
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
    this.clientesServicio.mostrarClientes().subscribe((datos) => {
      this.numClientes = datos['clientes']['length'];
    });

    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      this.numIncidencias = datos['incidencias']['length'];
    });
  }
  actualizarInfo() {
    this.clienteServicio
      .actualizarCliente2(this.form1.value)
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
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
