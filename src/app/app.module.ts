import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './Main/main.component';
import { HeaderComponent } from './Main/header/header.component';
import { BodyComponent } from './Main/body/body.component';
import { FooterComponent } from './Main/footer/footer.component';
import { SliderComponent } from './Main/body/slider/slider.component';
import { CategoriasComponent } from './Main/body/categorias/categorias.component';
import { LoginComponent } from './Main/login/login.component';
import { SudaderasComponent } from './Client/sudaderas/sudaderas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PantalonesComponent } from './Client/pantalones/pantalones.component';
import { ZapatillasComponent } from './Client/zapatillas/zapatillas.component';
import { AccesoriosComponent } from './Client/accesorios/accesorios.component';
import { CartComponent } from './Main/cart/cart.component';
import { DemoMaterialModule } from '../app/material-module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactComponent } from './Main/footer/contact/contact.component';
import { PuntosComponent } from './Client/puntos/puntos.component';
import { QuienesSomosComponent } from './Main/footer/quienes-somos/quienes-somos.component';
import { HeaderEmployeeComponent } from './Employee/empleado/header-employee/header-employee.component';
import { EmpleadoComponent } from './Employee/empleado/empleado.component';
import { BodyEmployeeComponent } from './Employee/empleado/body-employee/body-employee.component';
import { FooterEmployeeComponent } from './Employee/empleado/footer-employee/footer-employee.component';
import { PedidosComponent } from './Employee/pedidos/pedidos.component';
import { RopaComponent } from './Employee/ropa/ropa.component';
import { GestionarPuntosComponent } from './Employee/puntos/puntos.component';
import { IncidenciaComponent } from './Employee/incidencia/incidencia.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { GestionarUsuariosComponent } from './admin/gestionar-usuarios/gestionar-usuarios.component';
import { GestionarEmpleadosComponent } from './admin/gestionar-empleados/gestionar-empleados.component';
import { GestionarIncidenciasComponent } from './admin/gestionar-incidencias/gestionar-incidencias.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './Main/registro/registro.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SliderComponent,
    CategoriasComponent,
    LoginComponent,
    SudaderasComponent,
    PantalonesComponent,
    ZapatillasComponent,
    AccesoriosComponent,
    CartComponent,
    ContactComponent,
    PuntosComponent,
    QuienesSomosComponent,
    HeaderEmployeeComponent,
    EmpleadoComponent,
    BodyEmployeeComponent,
    FooterEmployeeComponent,
    PedidosComponent,
    RopaComponent,
    GestionarPuntosComponent,
    IncidenciaComponent,
    AdminComponent,
    AdminHeaderComponent,
    GestionarEmpleadosComponent,
    GestionarIncidenciasComponent,
    RegistroComponent
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
