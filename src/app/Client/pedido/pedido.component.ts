import { Component, OnInit } from '@angular/core';
import { CarroService } from 'src/app/carro.service';
import { ClienteService } from 'src/app/cliente.service';
import { PedidoService } from 'src/app/pedido.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/main/login/login.component';
import { render } from 'creditcardpayments/creditCardPayments';
import { PuntosService } from 'src/app/puntos.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.sass'],
})
export class PedidoComponent implements OnInit {
  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

  estaLogueado: boolean = this.login.estaLogueado();

  total: number = 0;

  canjearPuntos: FormGroup;

  cliente = {
    id: sessionStorage.getItem('id'),
    email: sessionStorage.getItem('email'),
    perfil: null,
    fecha: this.hoy,
    nombre: null,
    apellidos: null,
    provincia: null,
    localidad: null,
    domicilio: null,
    codigopostal: null,
    movil: null,
    imagen: null,
  };

  nombre: any;
  cantidad: any;
  talla: any;

  form1: FormGroup;
  form2: FormGroup;

  numProductos: any;

  productosEnCarrito = [];

  puntos: any;

  canjearpuntos: number = 0;

  flag = false;

  flag2 = false;

  puntos1 = 0;

  constructor(
    public fb: FormBuilder,
    private clienteServicio: ClienteService,
    private carroServicio: CarroService,
    private carritoServicio: CarroService,
    private pedidoServicio: PedidoService,
    readonly snackBar: MatSnackBar,
    private login: LoginComponent,
    private puntosServicio: PuntosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.snackBar.open(
      'Por favor no compres con una cuenta real de paypal.',
      '',
      {
        duration: 6000,
      }
    );

    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      domicilio: new FormControl(),
      imagen: new FormControl(),
    });

    this.form2 = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      domicilio: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      codigopostal: new FormControl('', Validators.required),
      movil: new FormControl('', Validators.required),
    });

    if (!this.estaLogueado) {
      this.router.navigateByUrl('/');
      this.snackBar.open('Necesitas iniciar sesión', '', {
        duration: 6000,
      });
    }

    this.obtenerDatos();
    this.obtenerCarro();
    this.contarProductos();

    let cliente = {
      id: sessionStorage.getItem('id'),
    };

    this.puntosServicio.obtenerPuntos(cliente).subscribe((datos) => {
      this.puntos = datos['puntos'];
    });

    this.canjearPuntos = this.fb.group({
      puntos: ['', [Validators.min(0)]],
    });

    let email = sessionStorage.getItem('email');
    let email1 = { email: email };
    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      this.form1.setValue({
        id: sessionStorage.getItem('id'),
        nombre: datos['cliente'][0]['nombre'],
        apellidos: datos['cliente'][0]['apellidos'],
        provincia: datos['cliente'][0]['provincia'],
        localidad: datos['cliente'][0]['localidad'],
        domicilio: datos['cliente'][0]['domicilio'],
        imagen: datos['cliente'][0]['imagen'],
      });
    });
  }

  obtenerDatos() {
    let email = sessionStorage.getItem('email');
    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
      this.form2.setValue({
        id: datos['cliente'][0]['id'],
        nombre: datos['cliente'][0]['nombre'],
        apellidos: datos['cliente'][0]['apellidos'],
        email: datos['cliente'][0]['email'],
        provincia: datos['cliente'][0]['provincia'],
        domicilio: datos['cliente'][0]['domicilio'],
        localidad: datos['cliente'][0]['localidad'],
        codigopostal: datos['cliente'][0]['codigopostal'],
        movil: datos['cliente'][0]['movil'],
      });

      if (this.form2.valid) {
        if (document.getElementById('miPaypalBoton').innerHTML.length == 0) {
          render({
            id: '#miPaypalBoton',
            currency: '€',
            value: '1.0',
            onApprove: (details) => {
              this.insertarPedido(this.cliente.codigopostal);
            },
          });
        }
      } else {
        document.getElementById('miPaypalBoton').remove();
      }

      this.cliente.perfil = datos['cliente'][0]['perfil'];
      this.cliente.nombre = datos['cliente'][0]['nombre'];
      this.cliente.apellidos = datos['cliente'][0]['apellidos'];
      this.cliente.provincia = datos['cliente'][0]['provincia'];
      this.cliente.localidad = datos['cliente'][0]['localidad'];
      this.cliente.domicilio = datos['cliente'][0]['domicilio'];
      this.cliente.codigopostal = datos['cliente'][0]['codigopostal'];
      this.cliente.movil = datos['cliente'][0]['movil'];
      this.cliente.imagen = datos['cliente'][0]['imagen'];
    });
  }

  comprobar() {
    if (this.form2.valid) {
      if (document.getElementById('miPaypalBoton').style.display == 'none') {
        document.getElementById('miPaypalBoton').style.display = 'block';
      }
    } else {
      document.getElementById('miPaypalBoton').style.display = 'none';
    }
  }

  actualizarInfo() {
    this.clienteServicio
      .actualizarCliente2(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.obtenerDatos();
          this.snackBar.open('Información actualizada', '', {
            duration: 6000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
  }

  actualizarInfo2() {
    this.clienteServicio
      .actualizarCliente(this.form2.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.obtenerDatos();
          this.snackBar.open('Información actualizada', '', {
            duration: 6000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
  }

  obtenerCarro() {
    let id = sessionStorage.getItem('id');
    let id1 = { id: id };

    this.pedidoServicio.obtenerComprarAhora().subscribe((datos) => {
      if (datos['comprarahora']['length'] == 0) {
        this.carroServicio.obtenerCarrito(id1).subscribe((datos) => {
          for (const key in datos['carro']) {
            this.productosEnCarrito.push(Object.values(datos['carro'][key]));
            this.total = this.total + parseInt(datos['carro'][key]['precio']);
          }
        });
      } else {
        this.flag = true;
        this.nombre = datos['comprarahora'][0]['nombre'];
        this.talla = datos['comprarahora'][0]['talla'];
        this.total = parseInt(datos['comprarahora'][0]['precio']);
        console.log(parseInt(datos['comprarahora'][0]['precio']));
      }
    });
  }

  contarProductos() {
    let id = sessionStorage.getItem('id');
    let id1 = { Id: id };
    this.carritoServicio.contarProductos(id1).subscribe((dato: any) => {
      this.numProductos = Object.values(dato['numero'][0]);
    });
  }

  insertarPedido(codigo: any) {
    this.clienteServicio.actualizarCliente(this.cliente);

    this.total = parseInt(document.getElementById('totalConEnvio').innerHTML);

    let pedido = {
      fecha: this.hoy,
      estado: 'pendiente',
      preciototal: this.total,
      id: sessionStorage.getItem('id'),
      email: sessionStorage.getItem('email')
    };

    this.pedidoServicio.hacerPedido(pedido).subscribe((dato) => {
      if (dato['resultado'] == 'OK') {
        this.pedidoServicio.borrarComprarAhora();

        let id1 = {
          id: sessionStorage.getItem('id'),
        };

        this.puntosServicio.obtenerPuntos(id1).subscribe((datos) => {
          console.log('puntosssss: ' + datos['puntos']);
          console.log('resultadooooo: ' + datos['resultado']);
            let clienteid = {
            idcliente: sessionStorage.getItem('id'),
            puntos: parseInt(datos['puntos']) + 3,
          };
          clienteid.puntos = clienteid.puntos - this.puntos1;
          this.puntosServicio.actualizarPuntos(clienteid).subscribe((datos) => {
            console.log(datos['puntos']);
          });
        });
        this.router.navigateByUrl('/');
        this.carroServicio.borrarProductos(id1).subscribe((datos) => {
          console.log(datos)
        });
        this.snackBar.open('Se ha realizado el pedido.', '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 6000,
        });
      }
        });
  }

  validarDatos() {
    if (this.form2.valid) {
      render({
        id: '#miPaypalBoton',
        currency: '€',
        value: '1.0',
        onApprove: (details) => {
          this.insertarPedido(this.cliente.codigopostal);
        },
      });
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  validarPuntos() {
    console.log(document.getElementById('totalConEnvio').innerHTML);
    if (
      this.canjearPuntos.value['puntos'] >
      document.getElementById('totalConEnvio').innerHTML
    ) {
      this.flag2 = true;
    } else {
      this.puntos1 = this.canjearPuntos.value['puntos'];
      let total2 =
        parseInt(document.getElementById('totalConEnvio').innerHTML) -
        this.canjearPuntos.value['puntos'];
      document.getElementById('totalConEnvio').innerHTML = total2.toString();
      document.getElementById('ptn').innerHTML =
        '-' + this.canjearPuntos.value['puntos'] + '€';
      this.flag2 = false;
    }
  }
}
