import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  hide = true;

  login = {
    email: null,
    contrasena: null,
  };

  loginForm: FormGroup;

  email1 = this.login.email;

  constructor(public fb: FormBuilder,private loginService: LoginService, private router: Router) {

  }

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
              this.router.navigate(['/sudaderas']);
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
        })
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
