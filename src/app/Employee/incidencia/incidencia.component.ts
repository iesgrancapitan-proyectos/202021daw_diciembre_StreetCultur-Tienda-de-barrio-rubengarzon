import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/main/login/login.component';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.sass']
})
export class IncidenciaComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  constructor(private login: LoginComponent) { }

  ngOnInit() {
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

}
