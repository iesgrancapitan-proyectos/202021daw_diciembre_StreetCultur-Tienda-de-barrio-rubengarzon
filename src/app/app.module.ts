import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BodyComponent } from './main/body/body.component';
import { FooterComponent } from './main/footer/footer.component';
import { SliderComponent } from './main/body/slider/slider.component';
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
import { PedidosComponent } from './Employee/pedidos/pedidos.component';
import { RopaComponent } from './Client/ropa/ropa.component';
import { GestionarPuntosComponent } from './Employee/puntos/puntos.component';
import { IncidenciaComponent } from './Employee/incidencia/incidencia.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { GestionarEmpleadosComponent } from './admin/gestionar-empleados/gestionar-empleados.component';
import { GestionarIncidenciasComponent } from './admin/gestionar-incidencias/gestionar-incidencias.component';
import { HttpClientModule } from '@angular/common/http';
import { PedidoComponent } from './Client/pedido/pedido.component';
import { DetalleRopaComponent } from './Client/ropa/detalle-ropa/detalle-ropa.component';





@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BodyComponent,
    FooterComponent,
    SliderComponent,
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
    AdminHeaderComponent,
    GestionarEmpleadosComponent,
    GestionarIncidenciasComponent,
    PedidoComponent,
    DetalleRopaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DemoMaterialModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
