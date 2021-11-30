import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { RopaService } from 'src/app/ropa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login.service';
import { PuntosService } from 'src/app/puntos.service';
import { ClienteService } from 'src/app/cliente.service';
import { PedidoService } from 'src/app/pedido.service';

@Component({
  selector: 'app-detalle-ropa',
  templateUrl: './detalle-ropa.component.html',
  styleUrls: ['./detalle-ropa.component.sass'],
})
export class DetalleRopaComponent implements OnInit {
  showFiller = false;


  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  id = sessionStorage.getItem("id");

  sudaderas = {
    Id: null,
    Nombre: null,
    Descripcion: null,
    Talla: null,
    Precio: null,
    Cantidad: null,
    Tipo: null,
    Color: null,
    Novedad: 1,
    Imagen: null,
    Imagen1: null,
  };

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

  numProductos: any;

  puntos: any;

  canjearpuntos: number = 0;

  cantidad = 1;

  talla = 'L';

  estaLogueado: boolean = this.login.estaLogueado();

  constructor(
    private login: LoginComponent,
    private carritoServicio: CarroService,
    private ropaServicio: RopaService,
    private rutaActiva: ActivatedRoute,
    readonly snackBar: MatSnackBar,
    private carro: CarroService,
    private loginService: LoginService,
    private router: Router,
    private puntosServicio: PuntosService,
    private clienteServicio: ClienteService,
    private pedidoServicio: PedidoService
  ) {}

  ngOnInit() {
    this.obtenerDatos();
    this.contarProductos();
    this.mostrarSudadera(this.rutaActiva.snapshot.params.id);
    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };
    this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
      this.puntos = datos['puntos'];
    });

    console.log(this.id)
  }

  obtenerDatos() {
    let email = sessionStorage.getItem('email');
    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      if (
        datos['cliente'][0]['nombre'] != null &&
        datos['cliente'][0]['domicilio'] != null &&
        datos['cliente'][0]['codigopostal'] &&
        datos['cliente'][0]['movil']
      ) {
        this.cliente.perfil = datos['cliente'][0]['perfil'];
        this.cliente.nombre = datos['cliente'][0]['nombre'];
        this.cliente.apellidos = datos['cliente'][0]['apellidos'];
        this.cliente.provincia = datos['cliente'][0]['provincia'];
        this.cliente.localidad = datos['cliente'][0]['localidad'];
        this.cliente.domicilio = datos['cliente'][0]['domicilio'];
        this.cliente.codigopostal = datos['cliente'][0]['codigopostal'];
        this.cliente.movil = datos['cliente'][0]['movil'];
        this.cliente.imagen = datos['cliente'][0]['imagen'];
      }
    });
  }
  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }

  mostrarSudadera(id: any) {
    let sudadera = {
      Id: id,
    };
    this.ropaServicio.obtenerSudadera(sudadera).subscribe((datos: any) => {
      this.sudaderas.Nombre = Object.values(datos)[0][0]['Nombre'];
      this.sudaderas.Precio = Object.values(datos)[0][0]['Precio'];
      this.sudaderas.Descripcion = Object.values(datos)[0][0]['Descripcion'];
      this.sudaderas.Imagen = Object.values(datos)[0][0]['Imagen'];
      this.sudaderas.Color = Object.values(datos)[0][0]['Color'];
      this.sudaderas.Imagen1 = Object.values(datos)[0][0]['Imagen1'];
    });
  }

  addCarrito(nombre: any, precio: any, imagen: any, cantidad: any, talla: any) {
    if (sessionStorage.getItem('email')) {
      console.log(cantidad);

      let total = precio * cantidad;

      let id = sessionStorage.getItem('id');
      let carrito = {
        nombre: nombre,
        imagen: imagen,
        precio: precio,
        cantidad: cantidad,
        total: total,
        talla: talla,
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
          console.log(dato);
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

  comprarAhora(nombre, precio, cantidad, talla) {
    let pedido = {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      talla: talla,
    };
    this.pedidoServicio.insertarComprarAhora(pedido).subscribe((datos) => {
      console.log(datos['resultado']);
    });
    this.router.navigateByUrl('/pedido');
  }
}
