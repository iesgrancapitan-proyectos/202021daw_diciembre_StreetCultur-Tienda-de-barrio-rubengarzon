import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { PuntosService } from 'src/app/puntos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/cliente.service';
import { PedidoService } from 'src/app/pedido.service';

@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styleUrls: ['./ropa.component.sass'],
})
export class RopaComponent implements OnInit {
  ropa: Ropa[] = [];

  formTalla: FormGroup;

  pantalones: any;

  form1: FormGroup;

  numPuntos: any;

  numProductos: any;

  estaLogueado: boolean = this.login.estaLogueado();

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
    private ropaServicio: RopaService,
    private login: LoginComponent,
    readonly snackBar: MatSnackBar,
    private carro: CarroService,
    private carritoServicio: CarroService,
    private loginService: LoginService,
    private router: Router,
    private puntosServicio: PuntosService,
    private clienteServicio: ClienteService,
    private pedidoServicio: PedidoService
  ) {}

  ngOnInit() {
    this.mostrarSudaderas();
    this.pedidoServicio.borrarComprarAhora().subscribe((datos) => {
      console.log(datos['resultado']);
    });
    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      domicilio: new FormControl(),
      imagen: new FormControl(),
    });

    this.formTalla = new FormGroup({
      talla: new FormControl(),
    });

    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };
    if (this.estaLogueado) {
      this.obtenerDatos();
      this.contarProductos();
      let cliente = {
        id: sessionStorage.getItem('id'),
      };
      this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
        this.numPuntos = datos['puntos'];
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
          domicilio: datos['cliente'][0]['domicilio'],
          imagen: datos['cliente'][0]['imagen'],
        });
      });
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  mostrarSudaderas() {
    this.ropaServicio.obtenerSudaderas().subscribe((datos: any) => {
      this.ropa = datos['sudaderas'];
    });
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

  addCarrito(nombre: any, precio: any, imagen: any) {
    if (sessionStorage.getItem('email')) {
      let id = sessionStorage.getItem('id');
      let carrito = {
        nombre: nombre,
        imagen: imagen,
        cantidad: 1,
        precio: precio,
        total: precio,
        talla: this.formTalla.get('talla').value,
        id: id,
      };

      this.carro.insertarCarro(carrito).subscribe((dato) => {
        if (Object.values(dato).includes('OK') == true) {
          this.contarProductos();
          return this.snackBar.open('Se ha añadido al carrito.', '', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 6000,
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
        duration: 6000,
      });
    }
  }

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }

  /**
   * Inicia sesión el empleado y almacena el email en una sesion
   */
  loginEmail() {
    this.loginService.loginUsuario(this.login).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.router.navigateByUrl('/');
        sessionStorage.setItem('email', datos.email);
        sessionStorage.setItem('id', datos.id);
        this.loginService.comprobarPerfil().subscribe((datos) => {
          switch (datos['perfil']) {
            case 'cliente':
              this.router.navigate(['/']);
              break;
            case 'empleado':
              this.router.navigate(['/empleado']);
              break;
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            default:
              break;
          }
        });
      } else {
        console.log('Ha habido un error al iniciar sesión');
      }
    });
  }

  mostrarPantalones() {
    this.ropaServicio.obtenerPantalones().subscribe((datos) => {
      this.ropa = datos['pantalones'];
    });
  }

  mostrarAccesorios() {
    this.ropaServicio.obtenerAccesorios().subscribe((datos) => {
      this.ropa = datos['accesorios'];
    });
  }

  mostrarCamisetas() {
    this.ropaServicio.obtenerCamisetas().subscribe((datos) => {
      this.ropa = datos['camisetas'];
    });
  }

  mostrarAbrigos() {
    this.ropaServicio.obtenerAbrigos().subscribe((datos) => {
      this.ropa = datos['abrigos'];
    });
  }

  mostrarChandal() {
    this.ropaServicio.obtenerChandal().subscribe((datos) => {
      this.ropa = datos['chandal'];
    });
  }
}
