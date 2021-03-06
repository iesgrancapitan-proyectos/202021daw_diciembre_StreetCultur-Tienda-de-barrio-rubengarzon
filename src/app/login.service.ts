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
        'http://localhost/streetcultur/php/registro.php',
        JSON.stringify(login)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/registro.php',
        JSON.stringify(login)
      );
    }
  }

  loginUsuario(login: any) {
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/login.php',
        JSON.stringify(login)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/login.php',
        JSON.stringify(login)
      );
    }
  }

  comprobarPerfil(){
    let login = {
      email: sessionStorage.getItem("email")
    };
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/perfil.php',
        JSON.stringify(login)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/perfil.php',
        JSON.stringify(login)
      );
    }
  }

  obtenerClientePorEmail(email){
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/obtenerClientePorEmail.php',
        JSON.stringify(email)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/obtenerClientePorEmail.php',
        JSON.stringify(email)
      );
    }
  }

  enviarEmail(email){
    console.log(email);
    if (this.env == 'Development') {
      return this.http.post(
        'http://localhost/streetcultur/php/email.php',
        JSON.stringify(email)
      );
    } else {
      return this.http.post(
        'https://streetcultur.com/php/email.php',
        JSON.stringify(email)
      );
    }
  }


}
