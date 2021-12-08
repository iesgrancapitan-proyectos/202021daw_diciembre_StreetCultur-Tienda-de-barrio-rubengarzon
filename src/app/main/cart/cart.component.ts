import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Model/Carrito';
import { CarroService } from 'src/app/carro.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/pedido.service';
import { Pedido } from 'src/app/Model/Pedido';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/cliente.service';
import { PuntosService } from 'src/app/puntos.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  carrito: Carrito[] = [];
  pedido: Pedido[] = [];

  numPuntos: any;
  carritoVacio = false;
  form1: FormGroup;
  numProductos: any;
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
    private carritoServicio: CarroService,
    private pedidoServicio: PedidoService,
    private login: LoginComponent,
    private router: Router,
    private snackBar: MatSnackBar,
    private clienteServicio: ClienteService,
    private puntosServicio: PuntosService
  ) {}

  ngOnInit() {
    this.pedidoServicio.borrarComprarAhora().subscribe((datos) => {
      console.log(datos['resultado']);
    });
    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      imagen: new FormControl(),
    });
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
    if (!this.estaLogueado) {
      this.router.navigateByUrl('/');
      this.snackBar.open('Necesitas iniciar sesión', '', {
        duration: 6000,
      });
    }
    this.mostrarCarrito();
    this.contarProductos();
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

  mostrarCarrito() {
    let id = sessionStorage.getItem('id');
    let id1 = { id: id };
    this.carritoServicio.obtenerCarrito(id1).subscribe((datos: any) => {
      this.carrito = datos['carro'];
      console.log(this.carrito);

      if (this.carrito.length == 0) {
        this.carritoVacio = true;
      } else {
        this.carritoVacio = false;
      }
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

  borrarProducto(id: any) {
    let carrito = { Id: id };
    this.carritoServicio.borrarProducto(carrito).subscribe((datos: any) => {
      if (Object.values(datos).includes('OK')) {
        console.log('El producto ha sido borrado');
        this.mostrarCarrito();
      } else {
        console.log('El producto no se ha borrado');
      }
    });
  }

  borrarProductos() {
    this.carritoServicio.vaciarProductos().subscribe((datos: any) => {
      if (Object.values(datos).includes('OK')) {
        console.log('El producto ha sido borrado');
        this.mostrarCarrito();
      } else {
        console.log('El producto no se ha borrado');
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
