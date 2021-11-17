import { Component, OnInit } from '@angular/core';
import { Ropa } from 'src/app/Model/Ropa';
import { CarroService } from 'src/app/carro.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { RopaService } from 'src/app/ropa.service';
import { ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-detalle-sudadera',
  templateUrl: './detalle-sudadera.component.html',
  styleUrls: ['./detalle-sudadera.component.sass']
})
export class DetalleSudaderaComponent implements OnInit {
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
    Imagen: null
  }

  numProductos: any;

  estaLogueado: boolean = this.login.estaLogueado();

  constructor(private login: LoginComponent,
              private carritoServicio: CarroService,
              private ropaServicio: RopaService,
              private rutaActiva: ActivatedRoute
              ) { }

  ngOnInit() {
    this.contarProductos();
    this.mostrarSudadera(this.rutaActiva.snapshot.params.id);
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

  mostrarSudadera(id:any) {
    let sudadera = {
      Id: id
    }
    this.ropaServicio.obtenerSudadera(sudadera).subscribe((datos: any) => {
      this.sudaderas.Imagen = Object.values(datos)[0][0]['Imagen'];
    });
  }

}
