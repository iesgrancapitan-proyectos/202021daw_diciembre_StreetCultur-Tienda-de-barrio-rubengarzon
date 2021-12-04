import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RopaService {
  env: string = environment.env;
  constructor(private http: HttpClient) {}

  obtenerRopa() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/ropa.php');
    } else {
      return this.http.get('https://streetcultur.com/php/ropa.php');
    }
  }

  obtenerSudadera(sudadera) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/sudadera.php',
        JSON.stringify(sudadera)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/sudadera.php',
        JSON.stringify(sudadera)
      );
    }
  }

  obtenerSudaderas() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/sudaderas.php');
    } else {
      return this.http.get('https://streetcultur.com/php/sudaderas.php');
    }
  }

  obtenerPantalones() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/pantalones.php');
    } else {
      return this.http.get('https://streetcultur.com/php/pantalones.php');
    }
  }

  obtenerZapatillas() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/zapatillas.php');
    } else {
      return this.http.get('https://streetcultur.com/php/zapatillas.php');
    }
  }

  obtenerAccesorios() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/accesorios.php');
    } else {
      return this.http.get('https://streetcultur.com/php/accesorios.php');
    }
  }

  borrarRopa(ropa: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/borrarRopa.php',
        JSON.stringify(ropa)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/borrarRopa.php',
        JSON.stringify(ropa)
      );
    }
  }

  actualizarRopa(ropa: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/actualizarRopa.php',
        JSON.stringify(ropa)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/actualizarRopa.php',
        JSON.stringify(ropa)
      );
    }
  }

  addRopa(ropa: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/addRopa.php',
        JSON.stringify(ropa)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/addRopa.php',
        JSON.stringify(ropa)
      );
    }
  }

  obtenerRopaPorId(id) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/ropaporid.php',
        JSON.stringify(id)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/ropaporid.php',
        JSON.stringify(id)
      );
    }
  }

  obtenerNovedades(){
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/novedades.php');
    } else {
      return this.http.get('https://streetcultur.com/php/novedades.php');
    }
  }

  obtenerChandal() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/chandal.php');
    } else {
      return this.http.get('https://streetcultur.com/php/chandal.php');
    }
  }

  obtenerAbrigos() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/abrigos.php');
    } else {
      return this.http.get('https://streetcultur.com/php/abrigos.php');
    }
  }

  obtenerCamisetas() {
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/camisetas.php');
    } else {
      return this.http.get('https://streetcultur.com/php/camisetas.php');
    }
  }
}
