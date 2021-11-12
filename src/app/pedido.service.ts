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
}
