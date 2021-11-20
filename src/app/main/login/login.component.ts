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
              this.router.navigate(['/ropa']);
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
        console.log('Ha habido un error al iniciar sesión');
      }
    });
  }
  registroEmail() {
    this.loginService.registrarUsuario(this.login).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.emailService.emailConfirmacion();
        let cliente = {
          email: this.login.email,
        };
        this.loginService.obtenerClientePorEmail(cliente).subscribe((datos) => {
          let cliente1 = { idcliente: datos['id'] };
          this.puntosService.insertarPuntos(cliente1).subscribe((datos) => {
            console.log(datos['resultado']);
          });
        });

        this.snackBar.open('¡Bienvenido! ya te has registrado', '', {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      } else {
        this.snackBar.open('Ha ocurrido un error inesperado', '', {
          duration: 1500,
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
