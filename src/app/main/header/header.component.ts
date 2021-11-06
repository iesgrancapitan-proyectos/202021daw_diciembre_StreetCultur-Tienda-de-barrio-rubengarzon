import { Component, Inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private login:LoginComponent) {}

  panelOpenState = false;

  estaLogueado:boolean = this.login.estaLogueado();

  cerrarSesion(){
    sessionStorage.removeItem("email");
    this.estaLogueado = false;
  }

}
