import { Component, OnInit } from '@angular/core';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { PuntosService } from 'src/app/puntos.service';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.sass']
})
export class PuntosComponent implements OnInit {
  numPuntos: any;
  puntos:number;
  numProductos: any;

  estaLogueado: boolean = this.login.estaLogueado();

  constructor(private puntosServicio: PuntosService,private login: LoginComponent,private carritoServicio: CarroService) { }

  ngOnInit() {
    this.contarProductos();
    this.puntosServicio.obtenerPuntos(sessionStorage.getItem("id")).subscribe( (datos) => {
     this.puntos = datos["puntos"];
    });
    let cliente = {
      idcliente: sessionStorage.getItem("id")
    }
    this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
      this.numPuntos = datos['puntos'];
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
