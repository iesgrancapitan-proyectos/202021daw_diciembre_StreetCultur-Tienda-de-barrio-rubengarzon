import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  env: string = environment.env;
  id = sessionStorage.getItem('id');
  id1 = { Id: this.id };
  constructor(private http: HttpClient) {}
  insertarCarro(carrito: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/insertarCarro.php',
        JSON.stringify(carrito)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/insertarCarro.php',
        JSON.stringify(carrito)
      );
    }
  }

  obtenerCarrito() {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/mostrarCarro.php',
        JSON.stringify(this.id1)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/mostrarCarro.php',
        JSON.stringify(this.id1)
      );
    }
  }
}
