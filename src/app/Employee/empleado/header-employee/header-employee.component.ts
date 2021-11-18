import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/main/login/login.component';

@Component({
  selector: 'app-header-employee',
  templateUrl: './header-employee.component.html',
  styleUrls: ['./header-employee.component.sass'],
})
export class HeaderEmployeeComponent implements OnInit {
  panelOpenState = false;

  estaLogueado: boolean = this.login.estaLogueado();
  constructor(
    private login: LoginComponent,
  ) {}

  ngOnInit() {}

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
