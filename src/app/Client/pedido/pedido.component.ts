import { Component, OnInit } from '@angular/core';
import { CarroService } from 'src/app/carro.service';
import { ClienteService } from 'src/app/cliente.service';
import { PedidoService } from 'src/app/pedido.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/main/login/login.component';
import { render } from 'creditcardpayments/creditCardPayments';
import { PuntosService } from 'src/app/puntos.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.sass'],
})
export class PedidoComponent implements OnInit {
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  estaLogueado: boolean = this.login.estaLogueado();

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

  nombre: any;
  cantidad: any;
  talla: any;

  numProductos: any;

  productosEnCarrito = [];

  total: number = 0;

  puntos: any;

  canjearpuntos: number = 0;

  flag = false;

  constructor(
    private clienteServicio: ClienteService,
    private carroServicio: CarroService,
    private carritoServicio: CarroService,
    private pedidoServicio: PedidoService,
    readonly snackBar: MatSnackBar,
    private login: LoginComponent,
    private puntosServicio: PuntosService
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    this.obtenerCarro();
    this.contarProductos();
    render({
      id: '#miPaypalBoton',
      currency: '€',
      value: '1.0',
      onApprove: (details) => {
        this.insertarPedido(this.cliente.codigopostal);
      },
    });

    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };

    this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
      this.puntos = datos['puntos'];
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

    this.pedidoServicio.obtenerComprarAhora().subscribe((datos) => {
      if (datos['comprarahora']['length'] == 0) {
        this.carroServicio.obtenerCarrito(id1).subscribe((datos) => {
          for (const key in datos['carro']) {
            this.productosEnCarrito.push(Object.values(datos['carro'][key]));
            this.total = this.total + parseInt(datos['carro'][key]['precio']);
          }
        });
      } else {
        this.flag = true;
        this.nombre = datos['comprarahora'][0]['nombre'];
        this.talla = datos['comprarahora'][0]['talla'];
        this.total = parseInt(datos['comprarahora'][0]['precio']);
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

  insertarPedido(codigo: any) {
    this.clienteServicio.actualizarCliente(this.cliente).subscribe((dato) => {
      console.log(dato['resultado']);
    });

    if (codigo > 14999 || codigo < 14000) {
      this.total = this.total + 3;
    }

    let pedido = {
      fecha: this.hoy,
      estado: 'pendiente',
      preciototal: this.total - this.canjearpuntos,
      id: sessionStorage.getItem('id'),
    };

    this.pedidoServicio.borrarComprarAhora();

    this.pedidoServicio.hacerPedido(pedido).subscribe((dato) => {
      if (dato['resultado'] == 'OK') {
        let clienteid = {
          idcliente: sessionStorage.getItem('id'),
          puntos: '',
        };
        this.puntosServicio.obtenerPuntos(clienteid).subscribe((datos) => {
          clienteid.puntos = datos['puntos'] + 3;
          this.puntosServicio.actualizarPuntos(clienteid);
        });

        this.carroServicio.borrarProductos();
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

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
