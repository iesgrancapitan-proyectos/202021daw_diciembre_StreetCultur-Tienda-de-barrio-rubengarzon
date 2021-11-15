import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-footer-employee',
  templateUrl: './footer-employee.component.html',
  styleUrls: ['./footer-employee.component.sass']
})
export class FooterEmployeeComponent implements OnInit {

  nombreEmpleado:any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.comprobarPerfil().subscribe((datos) =>{
      this.nombreEmpleado = datos["nombre"]
    })
  }

}
