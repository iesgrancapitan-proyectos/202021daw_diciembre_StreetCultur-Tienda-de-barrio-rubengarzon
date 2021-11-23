import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RopaService } from 'src/app/ropa.service';
import { Ropa } from 'src/app/Model/Ropa';
import { TilePosition } from '@angular/material/grid-list/tile-coordinator';

@Component({
  selector: 'app-gestionarropa',
  templateUrl: './gestionarropa.component.html',
  styleUrls: ['./gestionarropa.component.sass'],
})
export class GestionarRopaComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();

  estado: any;

  id: any;

  clientes: any;

  hayPedidos = false;

  ropa: Ropa[] = [];

  ropa1 = {
    Id: null,
    Nombre: null,
    Descripcion: null,
    Talla: null,
    Precio: null,
    Cantidad: null,
    Tipo: null,
    Color: null,
    Novedad: null,
    Imagen: null
  }


  constructor(
    private login: LoginComponent,
    private ropaServicio: RopaService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.ropaServicio.obtenerRopa().subscribe((datos) => {
      this.ropa = datos['ropa'];
    });
  }

  borrarRopa(id: any) {
    let ropa = {
      Id: id,
    };
    this.ropaServicio.borrarRopa(ropa).subscribe((datos) => {
        this.ropaServicio.obtenerRopa().subscribe((datos: any) => {
          this.ropa = datos['ropa'];
        });
        return this.snackBar.open('Se ha borrado la ropa.', '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1500,
        });
    })
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  modificarRopa(id, nombre, descripcion, talla, precio, cantidad, tipo, color) {
    console.log(nombre);
    let ropa = {
      Id: id,
      Nombre: nombre,
      Descripcion: descripcion,
      Talla: talla,
      Precio: precio,
      Cantidad: cantidad,
      Tipo: tipo,
      Color: color,
      Novedad: 1
    };
    this.ropaServicio.actualizarRopa(ropa).subscribe((datos) => {
      if (datos['resultado'] == 'OK') {
        this.ropaServicio.obtenerRopa().subscribe((datos) => {
          this.ropa = datos['ropa'];
        });
        this.snackBar.open('La ropa se ha modificado', '', {
          duration: 2000,
        });
      } else {
        alert('error');
      }
    });
  }

  addRopa(ropa:any){
    this.ropaServicio.addRopa(ropa);
  }

  pasarDatos(id){
   let ropa = {
      Id:id
    }
    this.ropaServicio.obtenerRopaPorId(ropa).subscribe((datos) => {
      this.ropa1.Id = datos["ropa"][0]["Id"]
      this.ropa1.Nombre = datos["ropa"][0]["Nombre"];
      this.ropa1.Descripcion = datos["ropa"][0]["Descripcion"];
      this.ropa1.Talla = datos["ropa"][0]["Talla"];
      this.ropa1.Precio = datos["ropa"][0]["Precio"];
      this.ropa1.Cantidad = datos["ropa"][0]["Cantidad"];
      this.ropa1.Tipo = datos["ropa"][0]["Tipo"];
      this.ropa1.Color = datos["ropa"][0]["Color"];
      this.ropa1.Novedad = datos["ropa"][0]["Novedad"];
    });
  }
}
