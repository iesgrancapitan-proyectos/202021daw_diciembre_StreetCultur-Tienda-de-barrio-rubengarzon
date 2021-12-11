import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente.service';
import { Pedido } from 'src/app/Model/Pedido';
import { Cliente } from 'src/app/Model/Cliente';
import { PedidoService } from 'src/app/pedido.service';
import { LoginComponent } from 'src/app/main/login/login.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RopaService } from 'src/app/ropa.service';
import { Ropa } from 'src/app/Model/Ropa';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-gestionarropa',
  templateUrl: './gestionarropa.component.html',
  styleUrls: ['./gestionarropa.component.sass'],
})
export class GestionarRopaComponent implements OnInit {
  estaLogueado: boolean = this.login.estaLogueado();
  ficheroSeleccionado1: any = null;

  estado: any;

  id: any;

  formModal: FormGroup;

  clientes: any;

  hayPedidos = false;

  nombreArchivo: any;

  form1: FormGroup;

  nombreImagen: any;

  base64textString: any;

  tiempoTranscurrido = Date.now();
  hoy = new Date(this.tiempoTranscurrido);

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

  formAddRopa = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Descripcion: new FormControl('', Validators.required),
    Talla: new FormControl('', Validators.required),
    Precio: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required),
    Tipo: new FormControl('', Validators.required),
    Color: new FormControl('', Validators.required),
    Novedad: new FormControl('', Validators.required),
    Imagen: new FormControl('', Validators.required),
  });

  constructor(
    private login: LoginComponent,
    private ropaServicio: RopaService,
    private clienteServicio: ClienteService,
    readonly snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    let cliente = {
      idcliente: sessionStorage.getItem('id'),
    };

    this.formModal = new FormGroup({
      Id: new FormControl('', Validators.required),
      Nombre: new FormControl('', Validators.required),
      Descripcion: new FormControl('', Validators.required),
      Talla: new FormControl('', Validators.required),
      Precio: new FormControl('', Validators.required),
      Cantidad: new FormControl('', Validators.required),
      Tipo: new FormControl('', Validators.required),
      Color: new FormControl('', Validators.required),
      Novedad: new FormControl('', Validators.required),
    });
    if (this.estaLogueado) {
      this.obtenerDatos();
      let cliente = {
        idcliente: sessionStorage.getItem('id'),
      };
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

    this.form1 = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellidos: new FormControl(),
      provincia: new FormControl(),
      localidad: new FormControl(),
      domicilio: new FormControl(),
      imagen: new FormControl(),
    });

    this.ropaServicio.obtenerRopa().subscribe((datos) => {
      this.ropa = datos['ropa'];
    });
  }

  ropa: Ropa[] = [];
  page_size: number = 3;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];

  actualizarInfo() {
    this.clienteServicio
      .actualizarCliente(this.form1.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.obtenerDatos();
          this.snackBar.open('Se ha actualizado la información', '', {
            duration: 6000,
          });
        } else {
          this.snackBar.open('Error inesperado', '', {
            duration: 6000,
          });
        }
      });
  }

  obtenerDatos() {
    console.log('holaaa');

    let email = sessionStorage.getItem('email');

    let email1 = { email: email };

    this.clienteServicio.mostrarCliente(email1).subscribe((datos) => {
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

  borrarRopa(id: any) {
    let ropa = {
      Id: id,
    };
    this.ropaServicio.borrarRopa(ropa).subscribe((datos) => {
      this.ropaServicio.obtenerRopa().subscribe((datos: any) => {
        this.ropa = datos['ropa'];
      });
      return this.snackBar.open('Se ha borrado la ropa.', '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 6000,
      });
    });
  }

  cerrarSesion() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.estaLogueado = false;
  }

  modificarRopa() {
    this.ropaServicio
      .actualizarRopa(this.formModal.value)
      .subscribe((datos) => {
        if (datos['resultado'] == 'OK') {
          this.ropaServicio.obtenerRopa().subscribe((datos) => {
            this.ropa = datos['ropa'];
          });
          this.snackBar.open('La ropa se ha modificado', '', {
            duration: 6000,
          });
        } else {
          alert('error');
        }
      });
  }

  ficheroSeleccionado(event) {
    this.ficheroSeleccionado1 = event.target.files[0];
    this.nombreImagen = event.target.files[0].name;
    if (this.ficheroSeleccionado1) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.ficheroSeleccionado1);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.base64textString = btoa(binaryString);
  }

  addRopa() {
    let archivo = {
      Nombre: this.formAddRopa.value['Nombre'],
      Descripcion: this.formAddRopa.value['Descripcion'],
      Precio: this.formAddRopa.value['Precio'],
      Tipo: this.formAddRopa.value['Tipo'],
      Color: this.formAddRopa.value['Color'],
      nombreArchivo: this.nombreImagen,
      base64: this.base64textString,
    };

    this.ropaServicio.addRopa(archivo).subscribe((datos) => {
      if (datos['resultado']) {
        this.snackBar.open('La ropa se ha añadido', '', {
          duration: 6000,
        });
        this.ropaServicio.obtenerRopa().subscribe((datos) => {
          this.ropa = datos['ropa'];
        });
      } else {
        console.log(datos['mensaje']);
      }
    });
  }

  pasarDatos(id) {
    let ropa = {
      Id: id,
    };
    this.ropaServicio.obtenerRopaPorId(ropa).subscribe((datos) => {
      console.log(datos['ropa'][0]['Descripcion']);
      this.formModal.setValue({
        Id: datos['ropa'][0]['Id'],
        Nombre: datos['ropa'][0]['Nombre'],
        Descripcion: datos['ropa'][0]['Descripcion'],
        Talla: datos['ropa'][0]['Talla'],
        Precio: datos['ropa'][0]['Precio'],
        Cantidad: datos['ropa'][0]['Cantidad'],
        Tipo: datos['ropa'][0]['Tipo'],
        Color: datos['ropa'][0]['Color'],
        Novedad: datos['ropa'][0]['Novedad'],
      });
    });
  }

  mostrarPantalones() {
    this.ropaServicio.obtenerPantalones().subscribe((datos) => {
      this.ropa = datos['pantalones'];
    });
  }

  mostrarAccesorios() {
    this.ropaServicio.obtenerAccesorios().subscribe((datos) => {
      this.ropa = datos['accesorios'];
    });
  }

  mostrarCamisetas() {
    this.ropaServicio.obtenerCamisetas().subscribe((datos) => {
      this.ropa = datos['camisetas'];
    });
  }

  mostrarAbrigos() {
    this.ropaServicio.obtenerAbrigos().subscribe((datos) => {
      this.ropa = datos['abrigos'];
    });
  }

  mostrarChandal() {
    this.ropaServicio.obtenerChandal().subscribe((datos) => {
      this.ropa = datos['chandal'];
    });
  }
  mostrarSudaderas() {
    this.ropaServicio.obtenerSudaderas().subscribe((datos: any) => {
      this.ropa = datos['sudaderas'];
    });
  }
  openDialog(id) {
    let id1 = {
      Id: id,
    };

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((datos) => {
      if (datos == true) {
        this.ropaServicio.borrarRopa(id1).subscribe((datos) => {
          if (datos['resultado'] == 'OK') {
            this.ropaServicio.obtenerRopa().subscribe((datos) => {
              this.ropa = datos['ropa'];
            });
          }
        });
      }
    });
  }
}

@Component({
  selector: 'dialogo',
  templateUrl: 'dialogo.html',
})
export class DialogOverviewExampleDialog3 {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog3>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
