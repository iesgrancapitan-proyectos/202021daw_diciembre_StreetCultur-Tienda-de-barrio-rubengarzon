import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RopaService {
  env: string = environment.env;
  constructor(private http: HttpClient) {}

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
}
