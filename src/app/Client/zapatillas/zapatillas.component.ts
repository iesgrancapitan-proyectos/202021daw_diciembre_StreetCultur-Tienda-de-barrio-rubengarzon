import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';

@Component({
  selector: 'app-zapatillas',
  templateUrl: './zapatillas.component.html',
  styleUrls: ['./zapatillas.component.sass'],
})
export class ZapatillasComponent implements OnInit {
  zapatillas: Ropa[] = [];

  constructor(
    private ropaServicio: RopaService,
    readonly snackBar: MatSnackBar,
    private carro: CarroService
  ) {}

  ngOnInit() {
    this.mostrarRopa();
  }

  mostrarRopa() {
    this.ropaServicio.obtenerZapatillas().subscribe((datos: any) => {
      this.zapatillas = datos['zapatillas'];
    });
  }

  guardarProducto(nombre: any, precio: any) {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      let carrito = { Nombre: nombre, Precio: precio, Id: id };

      this.carro.insertarCarro(carrito).subscribe((dato) => {
        if (Object.values(dato).includes('OK') == true) {
          return this.snackBar.open('Se ha añadido al carrito.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
        } else {
          console.log(dato);
          return false;
        }
      });
      return false;
    } else {
      return this.snackBar.open('Necesitas iniciar sesión.', 'De acuerdo', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
