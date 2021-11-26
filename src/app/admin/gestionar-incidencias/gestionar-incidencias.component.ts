import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from 'src/app/incidencia.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Incidencia } from 'src/app/Model/Incidencia';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-gestionar-incidencias',
  templateUrl: './gestionar-incidencias.component.html',
  styleUrls: ['./gestionar-incidencias.component.sass']
})
export class GestionarIncidenciasComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  incidencias: Incidencia[] = [];

  hayIncidencias = false;


  constructor(  public dialog: MatDialog,  readonly snackBar: MatSnackBar,
    private login: LoginComponent, private incidenciasServicio:IncidenciaService) { }

  ngOnInit() {
    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      if(datos['resultado'] == 'OK'){
        if(datos['incidencias']['length'] > 0){
          this.hayIncidencias = true;
          this.incidencias = datos['incidencias'];
        }else{
          this.hayIncidencias = false;
        }
      }else{
        console.log("error")
      }
    });

  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  borrarIncidencias(id){
    let incidencia = {
      id:id
    }
    this.incidenciasServicio.borrarIncidencias(incidencia).subscribe((datos) => {
        this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
          if(datos['incidencias']['length'] > 0){
            this.incidencias = datos['incidencias']
            this.hayIncidencias = true;
          }else{
            this.hayIncidencias = false;
          }
        });
        this.snackBar.open('La incidencia se ha borrado', '', {
          duration: 2000,
        });
    })

  }

  openDialog(id){

     const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
       width: '250px'
     })

     dialogRef.afterClosed().subscribe((datos) => {
       if(datos == true){
         this.borrarIncidencias(id);
       }
     })
   }
}

@Component({
  selector: 'dialogo',
  templateUrl: 'dialogo.html',
})
export class DialogOverviewExampleDialog1 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
