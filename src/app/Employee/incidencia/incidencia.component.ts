import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from 'src/app/incidencia.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.sass'],
})
export class IncidenciaComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  form = new FormGroup({
    email: new FormControl(sessionStorage.getItem("email")),
    motivo: new FormControl(),
  });

  onSubmit(): void {
    this.incidenciaServicio
      .insertarIncidencia(this.form.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.snackBar.open('Se ha abierto una incidencia.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
        }else{
          this.snackBar.open('Ha ocurrido un error inesperado.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
        }
      });
  }

  constructor(
    private login: LoginComponent,
    private incidenciaServicio: IncidenciaService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

}
