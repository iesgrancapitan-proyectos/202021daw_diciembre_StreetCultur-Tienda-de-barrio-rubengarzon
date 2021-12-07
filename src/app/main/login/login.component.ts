import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/email.service';
import { PuntosService } from 'src/app/puntos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  hide = true;

  flag = false;

  login = {
    email: null,
    contrasena: null,
  };

  loginForm: FormGroup;

  email1 = this.login.email;

  constructor(
    public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private emailService: EmailService,
    private puntosService: PuntosService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  /**
   * Inicia sesión el empleado y almacena el email en una sesion
   */
  loginEmail() {
    this.loginService.loginUsuario(this.login).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        sessionStorage.setItem('email', datos.email);
        sessionStorage.setItem('id', datos.id);
        this.loginService.comprobarPerfil().subscribe((datos) => {
          switch (datos['perfil']) {
            case 'cliente':
              if (this.router.url == "/ropa"){
                  this.router.navigate(['/']);
              }else{
                  this.router.navigate(['/ropa']);
              }
              break;
            case 'empleado':
              this.router.navigate(['/empleado']);
              break;
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            default:
              break;
          }
        });
      } else {
        this.snackBar.open('Email y/o contraseña incorrecta, vuelve a intentarlo', '', {
          duration: 6000,
        });
      }
    });
  }
  registroEmail() {
    this.loginService.registrarUsuario(this.login).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        let cliente = {
          email: this.login.email,
        };
        this.loginService.enviarEmail(cliente);

        this.snackBar.open('Por favor, revisa el correo electrónico ', '', {
          duration: 6000,
        });
        this.router.navigateByUrl('/ropa');
      } else {
        this.snackBar.open('Ha ocurrido un error inesperado', '', {
          duration: 6000,
        });
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

  cambiarFlag() {
    this.flag = true;
  }

  cambiarFlag1() {
    this.flag = false;
  }
}
