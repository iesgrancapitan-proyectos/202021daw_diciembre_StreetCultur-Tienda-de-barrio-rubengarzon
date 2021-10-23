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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DemoMaterialModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
