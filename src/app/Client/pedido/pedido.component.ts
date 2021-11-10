import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CarroService } from 'src/app/carro.service';
import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  cliente = {
    id: sessionStorage.getItem('id'),
    fecha: '12-12-2021',
    nombre: null,
    domicilio: null,
    codigo: null,
    movil: null,
  };

  productosEnCarrito = [];


  constructor(private clienteServicio: ClienteService, private carroServicio:CarroService) {}

  ngOnInit() {
    this.obtenerDatos();
    this.obtenerCarro();
  }

  rellenarDatos() {
    this.clienteServicio.actualizarCliente(this.cliente).subscribe((datos) => {
      if (datos['mensaje'] == undefined) {
        /* insertarPedido(pedido: any) {
          this.pedidoServicio.hacerPedido(pedido);
        } */
      } else {
        console.log('error');
      }
    });
  }

  obtenerDatos() {
    let email = sessionStorage.getItem('email');
    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      if (
        datos['cliente'][0]['nombre'] != null && datos['cliente'][0]['domicilio'] != null && datos['cliente'][0]['codigopostal']  && datos['cliente'][0]['movil']
      ) {
        this.cliente.nombre = datos['cliente'][0]['nombre'];
        this.cliente.domicilio = datos['cliente'][0]['domicilio'];
        this.cliente.codigo = datos['cliente'][0]['codigopostal'];
        this.cliente.movil = datos['cliente'][0]['movil'];
      }
    });
  }

  obtenerCarro(){
    let id = sessionStorage.getItem('id');
    let id1 = { id: id };
    this.carroServicio.obtenerCarrito(id1).subscribe((datos) => {
      /* this.productosEnCarrito = datos["carro"]; */
      for (const key in datos["carro"]) {
        /* console.log(Object.values(datos["carro"][key])); */
        this.productosEnCarrito.push(Object.values(datos["carro"][key]));
        /* this.productosEnCarrito.push(datos["carro"][key]); */
      }
      console.log(this.productosEnCarrito);
    });
  }


}
