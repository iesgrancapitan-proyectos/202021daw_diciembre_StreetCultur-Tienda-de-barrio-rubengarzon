import { Component, Inject, OnInit } from '@angular/core';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit{
  constructor(private login: LoginComponent, private carritoServicio: CarroService,) {}

  panelOpenState = false;
  numProductos: any;

  estaLogueado: boolean = this.login.estaLogueado();

  ngOnInit() {
    this.contarProductos();
  }


  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }
}
