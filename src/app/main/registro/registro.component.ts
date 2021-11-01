import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass'],
})
export class RegistroComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  login = {
    email: null,
    contrasena: null,
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
        this.snackBar.open('¡Bienvenido! te has registrado', '', {
          duration: 1000,
        });
        this.router.navigateByUrl('/login');
      } else {
        this.snackBar.open('Ha ocurrido un error inesperado', '', {
          duration: 1500,
        });
      }
    });
  }
}
