import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/Model/Carrito';
import { CarroService } from 'src/app/carro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carrito: Carrito[] = [];
  carritoVacio = false;

  constructor(private carritoServicio: CarroService, private router: Router) {}

  ngOnInit() {
    this.mostrarCarrito();
  }

  mostrarCarrito() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.obtenerCarrito(id1).subscribe((datos: any) => {
      this.carrito = datos['carro'];
      if (this.carrito.length == 0) {
        this.carritoVacio = true;
      }else{
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
}
