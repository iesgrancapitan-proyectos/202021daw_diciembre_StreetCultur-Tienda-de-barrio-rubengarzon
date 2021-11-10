import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  cliente = {
    id: sessionStorage.getItem("id"),
    fecha: "12-12-2021",
    nombre: null,
    domicilio: null,
    codigo: null,
    movil: null
  };

  constructor(private clienteServicio:ClienteService) { }

  ngOnInit() {
  }

  rellenarDatos(){
    this.clienteServicio.actualizarCliente(this.cliente).subscribe((datos) => {
      if(datos["mensaje"] == undefined){
        console.log("se ha modificado el pedido");
      }else{
        console.log("error");
      }
    });
  }

  obtenerDatos(){
    this.clienteServicio
  }


  /* insertarPedido(pedido: any) {
    this.pedidoServicio.hacerPedido(pedido);
  } */

}
