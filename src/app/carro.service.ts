import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  env: string = environment.env;
  contador: number;

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

  obtenerCarrito(id1: any) {
    if (this.env == 'Development') {
      console.log(id1);
      return this.http.post(
        'http://localhost/streetcultur/php/mostrarCarro.php',
        JSON.stringify(id1)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/mostrarCarro.php',
        JSON.stringify(id1)
      );
    }
  }

  borrarProducto(nombre: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/borrarProducto.php',
        JSON.stringify(nombre)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/borrarProducto.php',
        JSON.stringify(nombre)
      );
    }
  }

  contarProductos(id: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/contarProductos.php',
        JSON.stringify(id)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/contarProductos.php',
        JSON.stringify(id)
      );
    }
  }

  sumarProductos(){
    
  }

}
