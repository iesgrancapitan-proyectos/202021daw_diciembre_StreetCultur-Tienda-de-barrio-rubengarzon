import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.sass'],
})
export class BodyComponent implements OnInit {
  panelOpenState = false;
  numProductos: any;

  estaLogueado: boolean = this.login.estaLogueado();

  constructor(private login: LoginComponent,readonly snackBar: MatSnackBar, private carritoServicio: CarroService) {

  }

  ngOnInit() {
    this.contarProductos();
    return this.snackBar.open('Este sitio web es un proyecto de FP que está en desarrollo.', 'De acuerdo', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
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
