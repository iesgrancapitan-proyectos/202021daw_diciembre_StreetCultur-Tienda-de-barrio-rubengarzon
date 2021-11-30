import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  env: string = environment.env;

  constructor(private http: HttpClient) {}

  hacerPedido(pedido: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/hacerPedido.php',
        JSON.stringify(pedido)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/hacerPedido.php',
        JSON.stringify(pedido)
      );
    }
  }

  obtenerPedido(cliente) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/obtenerPedido.php',
        JSON.stringify(cliente)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/obtenerPedido.php',
        JSON.stringify(cliente)
      );
    }
  }

  obtenerCliente(id: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/hacerPedido.php',
        JSON.stringify(id)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/hacerPedido.php',
        JSON.stringify(id)
      );
    }
  }

  borrarPedido(id: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/borrarPedido.php',
        JSON.stringify(id)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/borrarPedido.php',
        JSON.stringify(id)
      );
    }
  }

  actualizarPedido(pedido) {
    console.log(pedido);
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/actualizarPedido.php',
        JSON.stringify(pedido)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/actualizarPedido.php',
        JSON.stringify(pedido)
      );
    }
  }

  insertarComprarAhora(pedido) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/insertarComprarAhora.php',
        JSON.stringify(pedido)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/insertarComprarAhora.php',
        JSON.stringify(pedido)
      );
    }
  }

  obtenerComprarAhora() {
    if (this.env == 'Development') {
      return this.http.get(
        'http://localhost/streetcultur/php/obtenerComprarAhora.php'
      );
    } else {
      return this.http.get(
        'https://streetcultur.com/php/obtenerComprarAhora.php'
      );
    }
  }

  borrarComprarAhora() {
    if (this.env == 'Development') {
      return this.http.get(
        'http://localhost/streetcultur/php/borrarComprarAhora.php'
      );
    } else {
      return this.http.get(
        'https://streetcultur.com/php/borrarComprarAhora.php'
      );
    }
  }

  obtenerPedidos() {
    if (this.env == 'Development') {
      return this.http.get(
        'http://localhost/streetcultur/php/obtenerPedidos.php'
      );
    } else {
      return this.http.get(
        'https://streetcultur.com/php/obtenerPedidos.php'
      );
    }
  }
}
