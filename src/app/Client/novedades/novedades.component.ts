import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/main/login/login.component';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';
import { ClienteService } from 'src/app/cliente.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.sass'],
})
export class NovedadesComponent implements OnInit {
  numPuntos: any;
  numProductos: any;
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

  ropa = [
    {
      Id: null,
      Nombre: null,
      Imagen: null,
      Precio: null,
    },
  ];

  constructor(
    private ropaServicio: RopaService,
    private clienteServicio: ClienteService,
    private login: LoginComponent,
    readonly snackBar: MatSnackBar,
    private carro: CarroService
  ) {}

  ngOnInit() {
    this.ropaServicio.obtenerNovedades().subscribe((datos) => {
      this.ropa = datos['novedades'];
    });
    this.contarProductos();
    this.obtenerDatos();

    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      imagen: new FormControl(),
    });
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

  addCarrito(nombre: any, precio: any, imagen: any) {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      let carrito = {
        nombre: nombre,
        imagen: imagen,
        cantidad: 1,
        precio: precio,
        total: precio,
        talla: 'M',
        id: id,
      };

      this.carro.insertarCarro(carrito).subscribe((dato) => {
        if (Object.values(dato).includes('OK') == true) {
          this.contarProductos();
          return this.snackBar.open('Se ha añadido al carrito.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 1500,
          });
        } else {
          return false;
        }
      });
      return false;
    } else {
      return this.snackBar.open('Necesitas iniciar sesión.', 'De acuerdo', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

  obtenerDatos() {
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
      .actualizarCliente2(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.snackBar.open('Se ha actualizado la información', '', {
            duration: 2000,
          });
          this.obtenerDatos();
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 2000,
          });
        }
      });
  }
  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carro.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }
}
