import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.sass']
})
export class EmpleadoComponent implements OnInit {

  constructor(private loginServicio: LoginService, private router: Router) { }

  ngOnInit() {
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
}
