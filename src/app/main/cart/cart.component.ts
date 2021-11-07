import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Model/Carrito';
import { CarroService } from 'src/app/carro.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrito: Carrito[] = [];

  constructor(private carritoServicio: CarroService) {}

  ngOnInit() {
    this.mostrarCarrito();
  }

  mostrarCarrito() {
    this.carritoServicio.obtenerCarrito().subscribe((datos: any) => {
      this.carrito = datos['carro'];
    });
  }
}
