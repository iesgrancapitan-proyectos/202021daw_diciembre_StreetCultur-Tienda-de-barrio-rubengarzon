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
import { Form, FormControl, FormGroup } from '@angular/forms';

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

  formAddRopa = new FormGroup({
    Id: new FormControl(''),
    Nombre: new FormControl(''),
    Descripcion: new FormControl(''),
    Talla: new FormControl(''),
    Precio: new FormControl(''),
    Cantidad: new FormControl(''),
    Tipo: new FormControl(''),
    Color: new FormControl(''),
    Novedad: new FormControl(''),
  })

  formModal = new FormGroup({
    Nombre: new FormControl('aaa'),
    Descripcion: new FormControl('aaa'),
    Talla: new FormControl('aaa'),
    Precio: new FormControl('aaa'),
    Cantidad: new FormControl('aaa'),
    Tipo: new FormControl('aaa'),
    Color: new FormControl('aaa'),
    Novedad: new FormControl('aaa'),
  })


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

  addRopa(){
    this.ropaServicio.addRopa(this.formAddRopa.value).subscribe((datos)=>{
      if(datos['resultado']){
        this.snackBar.open('La ropa se ha añadido', '', {
          duration: 2000,
        });
        this.ropaServicio.obtenerRopa().subscribe((datos) => {
          this.ropa = datos['ropa'];
        });
      }
    });
  }

  pasarDatos(id){
   let ropa = {
      Id:id
    }
    this.ropaServicio.obtenerRopaPorId(ropa).subscribe((datos) => {
      this.formModal.setValue({
        Id: datos["ropa"][0]["Id"],
        Nombre: datos["ropa"][0]["Nombre"],
        Descripcion: datos["ropa"][0]["Descripcion"],
        Talla: datos["ropa"][0]["Talla"],
        Precio: datos["ropa"][0]["Precio"],
        Cantidad: datos["ropa"][0]["Cantidad"],
        Tipo: datos["ropa"][0]["Tipo"],
        Color: datos["ropa"][0]["Color"],
        Novedad: datos["ropa"][0]["Novedad"],
      })
    });

  }
}
