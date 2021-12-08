import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';
import { LoginService } from 'src/app/login.service';
import { PuntosService } from 'src/app/puntos.service';
import { LoginComponent } from '../login/login.component';
import { ClienteService } from 'src/app/cliente.service';
import { PedidoService } from 'src/app/pedido.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.sass'],
})
export class BodyComponent implements OnInit {
  showFiller = false;
  panelOpenState = false;
  numProductos: any;
  numPuntos: any;

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
    imagen: null
  };

  estaLogueado: boolean = this.login.estaLogueado();

  constructor(
    private puntosServicio: PuntosService,
    private login: LoginComponent,
    readonly snackBar: MatSnackBar,
    private carritoServicio: CarroService,
    private clienteServicio: ClienteService,
    private pedidoServicio1: PedidoService
  ) {}

  ngOnInit() {
    this.pedidoServicio1.borrarComprarAhora().subscribe((datos) => {
      console.log(datos['resultado']);
    });
    this.obtenerDatos();
    this.contarProductos();
    let cliente = {
      idcliente: sessionStorage.getItem("id")
    }
    this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
      this.numPuntos = datos['puntos'][0]['puntos'];
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

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
