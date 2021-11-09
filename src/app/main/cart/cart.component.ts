import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Model/Carrito';
import { CarroService } from 'src/app/carro.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/pedido.service';
import { Pedido } from 'src/app/Model/Pedido';

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

  constructor(
    private carritoServicio: CarroService,
    private pedidoServicio: PedidoService
  ) {}

  ngOnInit() {
    this.mostrarCarrito();
    this.contarProductos();
  }

  mostrarCarrito() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.obtenerCarrito(id1).subscribe((datos: any) => {
      this.carrito = datos['carro'];

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

  /* insertarPedido() {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      let fecha = hoy.toLocaleDateString();
      let pedido = {
        Fecha: fecha,
        Nombre: 'aaa',
        Estado: 'pendiente',
        IdCliente: id,
      };

      this.pedidoServicio.hacerPedido(pedido);
    }
  } */

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }
}
