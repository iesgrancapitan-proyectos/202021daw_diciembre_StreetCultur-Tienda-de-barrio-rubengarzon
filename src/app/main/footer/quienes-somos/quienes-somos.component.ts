import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';
import { ClienteService } from 'src/app/cliente.service';
import { LoginComponent } from '../../login/login.component';
import { PuntosService } from 'src/app/puntos.service';


@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.sass'],
})
export class QuienesSomosComponent implements OnInit {
  panelOpenState = false;
  numProductos: any;

  form1: FormGroup;

  numPuntos: any;

  estaLogueado: boolean = this.login.estaLogueado();

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
    readonly snackBar: MatSnackBar,
    private carritoServicio: CarroService,
    private clienteServicio: ClienteService,
    private puntosServicio: PuntosService
  ) {}

  ngOnInit() {
    this.contarProductos();
    if (this.estaLogueado) {
      this.obtenerDatos();
      this.contarProductos();
      let cliente = {
        idcliente: sessionStorage.getItem('id'),
      };
      this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
        this.numPuntos = datos['puntos'][0]['puntos'];
      });
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
  }
  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
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

  actualizarInfo() {
    console.log(this.form1.value);
    this.clienteServicio
      .actualizarCliente(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
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

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
