import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { Cliente } from 'src/app/Model/Cliente';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.sass'],
})
export class GestionarClientesComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  clientes: Cliente[] = [];

  constructor(
    private login: LoginComponent,
    private clienteServicio: ClienteService
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
}
