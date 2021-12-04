import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/main/login/login.component';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.sass'],
})
export class NovedadesComponent implements OnInit {
  numPuntos: any;
  numProductos: any;
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  estaLogueado: boolean = this.login.estaLogueado();

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

  ropa = [
    {
      Id: null,
      Nombre: null,
      Imagen: null,
      Precio: null,
    },
  ];

  constructor(
    private ropaServicio: RopaService,
    private login: LoginComponent,
    readonly snackBar: MatSnackBar,
    private carro: CarroService,

  ) {}

  ngOnInit() {
    this.ropaServicio.obtenerNovedades().subscribe((datos) => {
      this.ropa = datos['novedades'];
    });
    this.contarProductos();
  }

  addCarrito(nombre: any, precio: any, imagen: any) {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      let carrito = {
        nombre: nombre,
        imagen: imagen,
        cantidad: 1,
        precio: precio,
        total: precio,
        talla: 'M',
        id: id,
      };

      this.carro.insertarCarro(carrito).subscribe((dato) => {
        if (Object.values(dato).includes('OK') == true) {
          this.contarProductos();
          return this.snackBar.open('Se ha añadido al carrito.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
        } else {
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

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carro.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
