import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { environment1 } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  localhost = environment.apiBase;
  produccion = environment1.apiBase;

  constructor(private http: HttpClient) {}

  registrarUsuario(login: any) {
    return this.http.post(
      this.localhost+'streetcultur/registro.php',
      JSON.stringify(login)
    );
  }
}
