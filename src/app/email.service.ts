import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  env: string = environment.env;
constructor(private http: HttpClient) { }

emailConfirmacion() {
  if (this.env == 'Development') {
    return this.http.get(
      'http://localhost/streetcultur/php/email.php'
    );
  } else {
    return this.http.get(
      'https://streetcultur.com/php/email.php'
    );
  }
}

}
