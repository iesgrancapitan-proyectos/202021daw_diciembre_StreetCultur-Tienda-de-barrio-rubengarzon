import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  regisForm: FormGroup;

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
    this.regisForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
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
              if (this.router.url == '/ropa') {
                this.router.navigate(['/']);
              } else {
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
        this.snackBar.open(
          'Email y/o contraseña incorrecta, vuelve a intentarlo',
          '',
          {
            duration: 6000,
          }
        );
      }
    });
  }
  registroEmail() {
    if (this.regisForm.valid) {
      this.loginService
        .registrarUsuario(this.regisForm.value)
        .subscribe((datos: any) => {
          if (datos['resultado'] == 'OK') {
            let login1 = {
              email: this.regisForm.get("email").value,
              contrasena: this.regisForm.get("password").value
            }
            this.loginService
              .loginUsuario(login1)
              .subscribe((datos: any) => {
                if (datos['resultado'] == 'OK') {
                  sessionStorage.setItem('email', datos.email);
                  sessionStorage.setItem('id', datos.id);
                  this.loginService.comprobarPerfil().subscribe((datos) => {
                    switch (datos['perfil']) {
                      case 'cliente':
                        if (this.router.url == '/ropa') {
                          this.router.navigate(['/']);
                        } else {
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
                  this.snackBar.open(
                    'Email y/o contraseña incorrecta, vuelve a intentarlo',
                    '',
                    {
                      duration: 6000,
                    }
                  );
                }
              });

            /* let cliente = {
              email: this.loginForm.get('email').value,
            };
            this.loginService
              .obtenerClientePorEmail(cliente)
              .subscribe((datos) => {
                console.log(datos);
                sessionStorage.setItem(
                  'email',
                  this.loginForm.get('email').value
                );
                sessionStorage.setItem('id', datos['id']);
                this.estaLogueado();
                this.router.navigateByUrl('/ropa'); */
          } else {
            this.snackBar.open('Ha ocurrido un error inesperado', '', {
              duration: 6000,
            });
          }
        });
    } else {
      this.snackBar.open(
        'Comprueba el formato del email y contraseña, vuelve a intentarlo.',
        '',
        {
          duration: 6000,
        }
      );
    }
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
