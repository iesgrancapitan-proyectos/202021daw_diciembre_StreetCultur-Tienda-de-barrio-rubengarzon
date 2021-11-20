import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { RopaService } from 'src/app/ropa.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ropa',
  templateUrl: './ropa.component.html',
  styleUrls: ['./ropa.component.sass'],
})
export class RopaComponent implements OnInit {
  ropa: Ropa[] = [];

  pantalones: any;

  numProductos: any;

  estaLogueado: boolean = this.login.estaLogueado();

  constructor(
    private ropaServicio: RopaService,
    private login: LoginComponent,
    readonly snackBar: MatSnackBar,
    private carro: CarroService,
    private carritoServicio: CarroService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mostrarSudaderas();
    this.contarProductos();
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
      this.ropa = datos['accesorios']
    });
  }
}
