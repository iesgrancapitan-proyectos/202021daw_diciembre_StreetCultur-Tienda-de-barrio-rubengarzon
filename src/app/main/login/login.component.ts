import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  login = {
    email: null,
    contrasena: null,
  };

  email1 = this.login.email;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * Inicia sesión el empleado y almacena el email en una sesion
   */
  loginEmail() {
    this.loginService.loginUsuario(this.login).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.router.navigateByUrl('/');
        sessionStorage.setItem('email', datos.email);
        sessionStorage.setItem('id', datos.id);
      } else {
        console.log('Ha habido un error al iniciar sesión');
      }
    });
  }
  /**
   * comprueba si alguien ha iniciado sesión
   * @returns true o false
   */
  estaLogueado() {
    if (sessionStorage.getItem('email')) {
      return true;
    } else {
      return false;
    }
  }
}
