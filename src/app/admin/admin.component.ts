import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { IncidenciaService } from '../incidencia.service';
import { LoginComponent } from '../main/login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  numClientes: any;
  numIncidencias: any;

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  cliente = {
    id: sessionStorage.getItem('id'),
    email: sessionStorage.getItem('email'),
    perfil: null,
    fecha: this.hoy,
    nombre: null,
    apellidos: null,
    provincia: null,
    localidad: null,
    domicilio: null,
    codigopostal: null,
    movil: null,
    imagen: null
  };

  constructor(private login: LoginComponent, private clientesServicio: ClienteService, private incidenciasServicio: IncidenciaService ) {}

  ngOnInit() {
    this.clientesServicio.mostrarClientes().subscribe((datos) => {
      this.numClientes = datos['clientes']["length"];
    })

    this.incidenciasServicio.mostrarIncidencias().subscribe((datos) => {
      this.numIncidencias = datos['incidencias']["length"];
    })
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
