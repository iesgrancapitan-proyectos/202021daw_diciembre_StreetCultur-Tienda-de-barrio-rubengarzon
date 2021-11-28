import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PuntosService {
  env: string = environment.env;

  constructor(private http: HttpClient) {}

  obtenerPuntos(cliente: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/obtenerPuntos.php',
        JSON.stringify(cliente)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/obtenerPuntos.php',
        JSON.stringify(cliente)
      );
    }
  }

  actualizarPuntos(cliente: any) {
    console.log(cliente);
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/actualizarPuntos.php',
        JSON.stringify(cliente)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/actualizarPuntos.php',
        JSON.stringify(cliente)
      );
    }
  }

  insertarPuntos(cliente: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/insertarPuntos.php',
        JSON.stringify(cliente)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/insertarPuntos.php',
        JSON.stringify(cliente)
      );
    }
  }

  borrarPuntos(cliente: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/borrarPuntos.php',
        JSON.stringify(cliente)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/borrarPuntos.php',
        JSON.stringify(cliente)
      );
    }
  }
}
