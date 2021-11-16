import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Model/Carrito';
import { CarroService } from 'src/app/carro.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/pedido.service';
import { Pedido } from 'src/app/Model/Pedido';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrito: Carrito[] = [];
  pedido: Pedido[] = [];
  carritoVacio = false;
  numProductos: any;
  estaLogueado: boolean = this.login.estaLogueado();

  constructor(
    private carritoServicio: CarroService,
    private pedidoServicio: PedidoService,
    private login: LoginComponent
  ) {}

  ngOnInit() {
    this.mostrarCarrito();
    this.contarProductos();
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
