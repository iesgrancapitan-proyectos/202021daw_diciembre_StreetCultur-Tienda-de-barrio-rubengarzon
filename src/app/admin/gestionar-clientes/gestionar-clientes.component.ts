import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { Cliente } from 'src/app/Model/Cliente';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.sass'],
})
export class GestionarClientesComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  clientes: Cliente[] = [];

  clientes1 = {
    id: null,
    perfil: null,
    email: null,
    password: null,
    nombre: null,
    apellidos: null,
    provincia: null,
    localidad: null,
    domicilio: null,
    codigopostal: null,
    movil: null
  }

  constructor(
    private login: LoginComponent,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.clienteServicio.mostrarClientes().subscribe((datos) => {
      this.clientes = datos['clientes'];
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  pasarDatos(email){
    let email1 = {
      email: email
    }
    this.clienteServicio.mostrarCliente(email1).subscribe((datos)=> {
      this.clientes1.id = datos["cliente"][0]["id"];
      this.clientes1.perfil = datos["cliente"][0]["perfil"];
      this.clientes1.email = datos["cliente"][0]["email"];
      this.clientes1.nombre = datos["cliente"][0]["nombre"];
      this.clientes1.apellidos = datos["cliente"][0]["apellidos"];
      this.clientes1.provincia = datos["cliente"][0]["provincia"];
      this.clientes1.localidad = datos["cliente"][0]["localidad"];
      this.clientes1.domicilio = datos["cliente"][0]["domicilio"];
      this.clientes1.codigopostal = datos["cliente"][0]["codigopostal"];
      this.clientes1.movil = datos["cliente"][0]["movil"];
    })
  }

  modificarCliente(id,perfil,email,nombre,apellidos,provincia,localidad,domicilio,codigopostal,movil){
    let cliente2 = {
      id: id,
      perfil:perfil,
      email:email,
      nombre:nombre,
      apellidos:apellidos,
      provincia:provincia,
      localidad:localidad,
      domicilio:domicilio,
      codigopostal:codigopostal,
      movil:movil
    }
    this.clienteServicio.actualizarCliente(cliente2).subscribe((datos) => {
      if(datos["resultado"] == "OK"){
        this.snackBar.open('El cliente se ha modificado', '', {
          duration: 2000,
        });
        this.clienteServicio.mostrarClientes();
      }
    })
  }
}
