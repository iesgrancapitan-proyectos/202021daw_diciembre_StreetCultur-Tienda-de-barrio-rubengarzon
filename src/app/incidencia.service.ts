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

  mostrarIncidencias(){
    if (this.env == 'Development') {
      return this.http.get('http://localhost/streetcultur/php/mostrarIncidencias.php');
    } else {
      return this.http.get('https://streetcultur.com/php/mostrarIncidencias.php');
    }
  }

  borrarIncidencias(incidencia){
    console.log(incidencia);
    if (this.env == 'Development') {
      return this.http.post('http://localhost/streetcultur/php/borrarIncidencia.php', JSON.stringify(incidencia));
    } else {
      return this.http.post('https://streetcultur.com/php/borrarIncidencia.php', JSON.stringify(incidencia));
    }
  }
}
