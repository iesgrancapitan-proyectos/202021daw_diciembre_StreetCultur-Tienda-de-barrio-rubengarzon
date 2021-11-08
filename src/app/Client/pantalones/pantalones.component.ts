import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';

@Component({
  selector: 'app-pantalones',
  templateUrl: './pantalones.component.html',
  styleUrls: ['./pantalones.component.sass']
})
export class PantalonesComponent implements OnInit {
  pantalones: Ropa[] = [];
  constructor(
    private ropaServicio: RopaService,
    readonly snackBar: MatSnackBar,
    private carro: CarroService
  ) { }

  ngOnInit() {
    this.mostrarRopa();
  }

  mostrarRopa() {
    this.ropaServicio.obtenerPantalones().subscribe((datos: any) => {
      this.pantalones = datos['pantalones'];
    });
  }

  guardarProducto(nombre: any, precio: any) {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      let carrito = { Nombre: nombre, Precio: precio, Id: id };
      this.carro.insertarCarro(carrito);
      return false;
    } else {
      return this.snackBar.open('Necesitas iniciar sesión.', 'De acuerdo', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

}
