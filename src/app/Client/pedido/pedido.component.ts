import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/pedido.service';
import {NgForm} from '@angular/forms';
import { Cliente } from 'src/app/Model/Cliente';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  /* cliente: Cliente[] = []; */

  cliente = {
    nombre: null,
    contrasena: null,
  };

  constructor(private pedidoServicio:PedidoService) { }

  ngOnInit() {
  }

  rellenarDatos(){
    
  }

  /* insertarPedido(pedido: any) {
    this.pedidoServicio.hacerPedido(pedido);
  } */

}
