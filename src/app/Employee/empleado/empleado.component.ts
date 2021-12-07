import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { ClienteService } from 'src/app/cliente.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.sass'],
})
export class EmpleadoComponent implements OnInit {
  showFiller = false;
  nombreEmpleado: any;

  constructor(
    private clienteServicio: ClienteService,
    private login: LoginComponent,
    readonly snackBar: MatSnackBar,
    private loginServicio: LoginService,
    private router: Router,
  ) {}

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  form1: FormGroup;
  estaLogueado: boolean = this.login.estaLogueado();
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

  ngOnInit() {
    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };
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

    this.loginServicio.comprobarPerfil().subscribe((datos) => {
      this.nombreEmpleado = datos['nombre'];
    });

    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      imagen: new FormControl(),
    });

    if (sessionStorage.getItem('email')) {
      this.estaLogueado = true;
    } else {
      this.estaLogueado = false;
    }

    if (sessionStorage.getItem('email').length > 0) {
      this.loginServicio.comprobarPerfil().subscribe((datos) => {
        if (datos['perfil'] == 'cliente') {
          this.router.navigate(['/']);
        } else if (datos['perfil'] == 'admin') {
          this.router.navigate(['/admin']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }

    console.log(this.estaLogueado);
  }

  actualizarInfo() {
    console.log(this.form1.value);
    this.clienteServicio
      .actualizarCliente(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.snackBar.open('Se ha actualizado la información', '', {
            duration: 6000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
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
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
