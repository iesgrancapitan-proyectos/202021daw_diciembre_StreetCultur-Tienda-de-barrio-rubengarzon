import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PuntosService } from 'src/app/puntos.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.sass'],
})
export class GestionarPuntosComponent implements OnInit {
  clientess = [
    {
      id: null,
      nombre: null,
      apellidos: null,
      puntos: null,
    },
  ];

  estaLogueado: boolean = this.login.estaLogueado();

  estado: any;

  id: any;

  form1: FormGroup;

  clientes: any;

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
    imagen: null,
  };

  constructor(
    private login: LoginComponent,
    private puntosServicio: PuntosService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.puntosServicio.obtenerTodosPuntos().subscribe((datos: any) => {
      this.clientess = datos['clientes'];
      console.log(this.clientess);
    });

    if (this.estaLogueado) {
      this.obtenerDatos();
      let cliente = {
        idcliente: sessionStorage.getItem('id'),
      };
      let email = sessionStorage.getItem('email');
      let email1 = { email: email };
      this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
        this.form1.setValue({
          id: sessionStorage.getItem('id'),
          nombre: datos['cliente'][0]['nombre'],
          apellidos: datos['cliente'][0]['apellidos'],
          provincia: datos['cliente'][0]['provincia'],
          localidad: datos['cliente'][0]['localidad'],
          imagen: datos['cliente'][0]['imagen'],
        });
      });
    }

    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      imagen: new FormControl(),
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  obtenerDatos() {
    console.log('holaaa');

    let email = sessionStorage.getItem('email');

    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      this.cliente.perfil = datos['cliente'][0]['perfil'];
      this.cliente.nombre = datos['cliente'][0]['nombre'];
      this.cliente.apellidos = datos['cliente'][0]['apellidos'];
      this.cliente.provincia = datos['cliente'][0]['provincia'];
      this.cliente.localidad = datos['cliente'][0]['localidad'];
      this.cliente.domicilio = datos['cliente'][0]['domicilio'];
      this.cliente.codigopostal = datos['cliente'][0]['codigopostal'];
      this.cliente.movil = datos['cliente'][0]['movil'];
      this.cliente.imagen = datos['cliente'][0]['imagen'];
    });
  }

  actualizarInfo() {
    console.log(this.form1.value);
    this.clienteServicio
      .actualizarCliente(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.obtenerDatos();
          this.snackBar.open('Información actualizada', '', {
            duration: 6000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
  }

  modificarPuntos(id, puntos) {
    let puntoss = {
      id: id,
      puntos: puntos,
    };
    this.puntosServicio.actualizarPuntos(puntoss).subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        this.snackBar.open('Puntos actualizados', '', {
          duration: 6000,
        });
      } else {
        alert('error');
      }
    });
  }
}
