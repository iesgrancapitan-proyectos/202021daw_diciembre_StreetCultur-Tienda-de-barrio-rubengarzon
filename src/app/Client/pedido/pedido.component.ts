import { Component, OnInit } from '@angular/core';
import { CarroService } from 'src/app/carro.service';
import { ClienteService } from 'src/app/cliente.service';
import { PedidoService } from 'src/app/pedido.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  cliente = {
    id: sessionStorage.getItem('id'),
    email: sessionStorage.getItem('email'),
    fecha: this.hoy,
    nombre: null,
    apellidos: null,
    provincia: null,
    localidad: null,
    domicilio: null,
    codigopostal: null,
    movil: null,
  };

  numProductos: any;

  productosEnCarrito = [];

  total:number = 0;

  constructor(
    private clienteServicio: ClienteService,
    private carroServicio: CarroService,
    private carritoServicio: CarroService,
    private pedidoServicio: PedidoService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    this.obtenerCarro();
    this.contarProductos();
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
        this.cliente.nombre = datos['cliente'][0]['nombre'];
        this.cliente.apellidos = datos['cliente'][0]['apellidos'];
        this.cliente.provincia = datos['cliente'][0]['provincia'];
        this.cliente.localidad = datos['cliente'][0]['localidad'];
        this.cliente.domicilio = datos['cliente'][0]['domicilio'];
        this.cliente.codigopostal = datos['cliente'][0]['codigopostal'];
        this.cliente.movil = datos['cliente'][0]['movil'];
      }
    });
  }

  obtenerCarro() {
    let id = sessionStorage.getItem('id');
    let id1 = { id: id };
    this.carroServicio.obtenerCarrito(id1).subscribe((datos) => {
      for (const key in datos['carro']) {
        this.productosEnCarrito.push(Object.values(datos['carro'][key]));
          this.total = this.total +  parseInt(datos['carro'][key]['precio']);
          console.log(isNaN(this.total));
        }
      }
    );
  }

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }

  insertarPedido() {
    this.clienteServicio.actualizarCliente(this.cliente).subscribe((dato) => {
      console.log(dato['resultado']);
    });
    let pedido = {
      fecha: this.hoy,
      estado: 'pendiente',
      preciototal: this.total,
      id: sessionStorage.getItem('id'),
    };

    this.pedidoServicio.hacerPedido(pedido).subscribe((dato) => {
      if (dato['resultado'] == 'OK') {
        return this.snackBar.open('Se ha realizado el pedido.', '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
      } else {
        return false;
      }
    });
  }
}
