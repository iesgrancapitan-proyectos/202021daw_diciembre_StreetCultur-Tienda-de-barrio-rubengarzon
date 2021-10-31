import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  env: string = environment.env;

  constructor(private http: HttpClient) {}

  registrarUsuario(login: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/registro.php',
        JSON.stringify(login)
      );
    } else {
      return this.http.post(
        'http://streetcultur.com/registro.php',
        JSON.stringify(login)
      );
    }
  }
}
