import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BodyComponent } from './main/body/body.component';
import { FooterComponent } from './main/footer/footer.component';
import { CategoriasComponent } from './main/body/categorias/categorias.component';
import { LoginComponent } from './main/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './main/cart/cart.component';
import { DemoMaterialModule } from '../app/material-module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactComponent } from './main/footer/contact/contact.component';
import { PuntosComponent } from './Client/puntos/puntos.component';
import { QuienesSomosComponent } from './main/footer/quienes-somos/quienes-somos.component';
import { EmpleadoComponent } from './Employee/empleado/empleado.component';
import { DialogOverviewExampleDialog2, PedidosComponent } from './Employee/pedidos/pedidos.component';
import { RopaComponent } from './Client/ropa/ropa.component';
import { GestionarPuntosComponent } from './Employee/puntos/puntos.component';
import { IncidenciaComponent } from './Employee/incidencia/incidencia.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from './Client/pedido/pedido.component';
import { DetalleRopaComponent } from './Client/ropa/detalle-ropa/detalle-ropa.component';
import { DialogOverviewExampleDialog3, GestionarRopaComponent } from './Employee/gestionarropa/gestionarropa.component';
import { DialogOverviewExampleDialog, GestionarClientesComponent } from './admin/gestionar-clientes/gestionar-clientes.component';
import { DialogOverviewExampleDialog1, GestionarIncidenciasComponent } from './admin/gestionar-incidencias/gestionar-incidencias.component';
import { HeaderComponent } from './main/body/header/header.component';
import { NovedadesComponent } from './Client/novedades/novedades.component';
import { ImageUploadModule } from 'angular2-image-upload';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BodyComponent,
    FooterComponent,
    CategoriasComponent,
    LoginComponent,
    CartComponent,
    ContactComponent,
    PuntosComponent,
    QuienesSomosComponent,
    EmpleadoComponent,
    PedidosComponent,
    RopaComponent,
    GestionarPuntosComponent,
    IncidenciaComponent,
    AdminComponent,
    GestionarIncidenciasComponent,
    PedidoComponent,
    DetalleRopaComponent,
    GestionarRopaComponent,
    GestionarClientesComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    DialogOverviewExampleDialog2,
    DialogOverviewExampleDialog3,
    HeaderComponent,
    NovedadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DemoMaterialModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ImageUploadModule.forRoot()
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
