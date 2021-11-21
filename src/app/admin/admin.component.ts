import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../main/login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  constructor(private login: LoginComponent) {}

  ngOnInit() {}

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
