import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  registrarUsuario(login: any) {
    return this.http.post('./registro.php', JSON.stringify(login));
  }

}
