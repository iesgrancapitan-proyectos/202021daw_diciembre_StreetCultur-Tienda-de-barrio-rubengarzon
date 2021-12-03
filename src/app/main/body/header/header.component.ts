import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  constructor(private login: LoginComponent) { }

  ngOnInit() {
  }

}
