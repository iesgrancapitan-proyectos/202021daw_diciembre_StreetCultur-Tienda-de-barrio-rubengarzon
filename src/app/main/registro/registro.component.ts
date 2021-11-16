import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/email.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass'],
})
export class RegistroComponent implements OnInit {
  hide = true;

  registroForm: FormGroup;

  login = {
    email: null,
    contrasena: null,
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private emailService: EmailService,
    public fb: FormBuilder
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {}


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
    this.emailService.emailConfirmacion();
    }
}
