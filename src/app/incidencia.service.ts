import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  env: string = environment.env;
  constructor(private http: HttpClient) {}

  insertarIncidencia(incidencia) {
    if (this.env == 'Development') {
      return this.http.post('http://localhost/streetcultur/php/insertarIncidencia.php', JSON.stringify(incidencia));
    } else {
      return this.http.post('https://streetcultur.com/php/insertarIncidencia.php', JSON.stringify(incidencia));
    }
  }
}
