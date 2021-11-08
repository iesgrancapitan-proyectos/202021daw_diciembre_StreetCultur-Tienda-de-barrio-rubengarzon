import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LocalstorageService } from 'src/app/localstorage.service';
import { CarroService } from 'src/app/carro.service';

@Component({
  selector: 'app-sudaderas',
  templateUrl: './sudaderas.component.html',
  styleUrls: ['./sudaderas.component.sass'],
})
export class SudaderasComponent implements OnInit {
  sudaderas: Ropa[] = [];

  constructor(
    private ropaServicio: RopaService,
    readonly snackBar: MatSnackBar,
    private localStorage: LocalstorageService,
    private carro: CarroService
  ) {}

  ngOnInit() {
    this.mostrarRopa();
  }

  mostrarRopa() {
    this.ropaServicio.obtenerSudaderas().subscribe((datos: any) => {
      this.sudaderas = datos['sudaderas'];
    });
  }

  guardarProducto(nombre: any, precio: any) {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      let carrito = { Nombre: nombre, Precio: precio, Id: id };
      this.carro.insertarCarro(carrito).subscribe( dato => {
        console.log(dato);
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
