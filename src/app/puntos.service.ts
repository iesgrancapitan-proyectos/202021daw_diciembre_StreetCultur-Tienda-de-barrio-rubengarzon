import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  env: string = environment.env;

constructor(private http: HttpClient) { }

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

}
