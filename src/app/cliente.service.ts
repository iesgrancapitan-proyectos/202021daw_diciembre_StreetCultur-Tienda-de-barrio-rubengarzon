import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  env: string = environment.env;

constructor(private http: HttpClient) { }


mostrarIdClientes(){
  if (this.env == 'Development') {
    return this.http.get(
      'http://localhost/streetcultur/php/listaCliente.php'
    );
  } else {
    return this.http.get(
      'https://streetcultur.com/php/listaCliente.php'
    );
  }
}

mostrarCliente(email:any) {
  if (this.env == 'Development') {
    return this.http.post(
      'http://localhost/streetcultur/php/mostrarCliente.php',
      JSON.stringify(email)
    );
  } else {
    return this.http.post(
      'https://streetcultur.com/php/mostrarCliente.php',
      JSON.stringify(email)
    );
  }
}

mostrarClienteId(id:any) {
  if (this.env == 'Development') {
    return this.http.post(
      'http://localhost/streetcultur/php/mostrarClienteId.php',
      JSON.stringify(id)
    );
  } else {
    return this.http.post(
      'https://streetcultur.com/php/mostrarClienteId.php',
      JSON.stringify(id)
    );
  }
}

actualizarCliente(cliente:any) {
  if (this.env == 'Development') {
    return this.http.post(
      'http://localhost/streetcultur/php/actualizarCliente.php',
      JSON.stringify(cliente)
    );
  } else {
    return this.http.post(
      'https://streetcultur.com/php/actualizarCliente.php',
      JSON.stringify(cliente)
    );
  }
}

mostrarClientes(){
  if (this.env == 'Development') {
    return this.http.get(
      'http://localhost/streetcultur/php/mostrarClientes.php'
    );
  } else {
    return this.http.get(
      'https://streetcultur.com/php/mostrarClientes.php'
    );
  }
}

borrarCliente(id){
  if (this.env == 'Development') {
    return this.http.post(
      'http://localhost/streetcultur/php/borrarCliente.php', JSON.stringify(id)
    );
  } else {
    return this.http.post(
      'https://streetcultur.com/php/borrarCliente.php', JSON.stringify(id)
    );
  }
}

}
