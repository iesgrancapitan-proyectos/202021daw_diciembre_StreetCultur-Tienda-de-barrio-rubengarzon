import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { LoginComponent } from 'src/app/main/login/login.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.sass']
})
export class EmpleadoComponent implements OnInit {
  nombreEmpleado:any;
  estaLogueado: boolean = this.login.estaLogueado();


  constructor(private login: LoginComponent,private loginServicio: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginServicio.comprobarPerfil().subscribe((datos) =>{
      this.nombreEmpleado = datos["nombre"]
    })
    console.log(sessionStorage.getItem("email").length);
    if(sessionStorage.getItem("email").length > 0){
    this.loginServicio.comprobarPerfil().subscribe((datos) => {
        if(datos["perfil"] == "cliente"){
          this.router.navigate(["/"]);
        }else if(datos["perfil"] == "admin"){
          this.router.navigate(["/admin"]);
        }
      })
    }else{
      this.router.navigate(["/login"]);
    }
  }
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
