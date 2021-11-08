import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  env: string = environment.env;
  /* id = sessionStorage.getItem('id');
  id1 = { Id: this.id }; */
  constructor(private http: HttpClient) {}

  obtenerPedido() {
    if (this.env == 'Development') {
      return this.http.get(
        'http://localhost/streetcultur/php/mostrarPedido.php'
      );
    } else {
      return this.http.get('https://streetcultur.com/php/mostrarPedido.php');
    }
  }

  obtenerCliente(id: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/mostrarPedido.php',
        JSON.stringify(id)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/mostrarPedido.php',
        JSON.stringify(id)
      );
    }
  }
}
