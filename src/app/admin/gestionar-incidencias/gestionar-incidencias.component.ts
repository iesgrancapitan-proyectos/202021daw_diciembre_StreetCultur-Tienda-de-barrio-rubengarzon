import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from 'src/app/incidencia.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Incidencia } from 'src/app/Model/Incidencia';

@Component({
  selector: 'app-gestionar-incidencias',
  templateUrl: './gestionar-incidencias.component.html',
  styleUrls: ['./gestionar-incidencias.component.sass']
})
export class GestionarIncidenciasComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  incidencias: Incidencia[] = [];

  hayIncidencias = false;


  constructor(    readonly snackBar: MatSnackBar,
    private login: LoginComponent, private incidenciasServicio:IncidenciaService) { }

  ngOnInit() {
    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      if(datos['resultado'] == 'OK'){
        this.hayIncidencias = true;
        this.incidencias = datos['incidencias'];
      }else{
        this.hayIncidencias = false;
      }
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  borrarIncidencias(email){
    let email1 = {
      email:email
    }
    this.incidenciasServicio.borrarIncidencias(email1).subscribe((datos) => {
      if(datos["incidencias"] > 0){
        this.hayIncidencias = true;
        this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
          if(datos['resultado'] == 'OK'){
            this.incidencias = datos['incidencias']
            this.hayIncidencias = false;
          }
        });
        this.snackBar.open('La incidencia se ha borrado', '', {
          duration: 2000,
        });
      }else{
        this.hayIncidencias = false;
      }
    })

  }
}
