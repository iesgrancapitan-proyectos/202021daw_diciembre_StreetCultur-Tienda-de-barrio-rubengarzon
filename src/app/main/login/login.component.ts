import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loginEmail() {
    this.loginService.registrarUsuario(this.login).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        alert('Te has registrado');
      } else {
        console.log('Ha habido un error al iniciar sesión');
      }
    });
  }
}
