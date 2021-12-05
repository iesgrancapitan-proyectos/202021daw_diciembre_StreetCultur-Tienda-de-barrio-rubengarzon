import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { LoginComponent } from '../../login/login.component';
import { CarroService } from 'src/app/carro.service';
import { PuntosService } from 'src/app/puntos.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
})
export class ContactComponent implements OnInit {
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);
  numProductos: any;
  estaLogueado: boolean = this.login.estaLogueado();
  puntos: any;
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
    private login: LoginComponent,
    private carritoServicio: CarroService,
    private puntosServicio: PuntosService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };
    this.contarProductos();
    /* this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
      this.puntos = datos['puntos'];
    }); */
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

  enviarForm() {
    this.snackBar.open("Los datos han sido enviados", "", {
      duration: 1000
    });
  }
}
