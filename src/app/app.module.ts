import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { BodyComponent } from './main/body/body.component';
import { FooterComponent } from './main/footer/footer.component';
import { SliderComponent } from './main/body/slider/slider.component';
import { CategoriasComponent } from './main/body/categorias/categorias.component';
import { LoginComponent } from './login/login.component';
import { SudaderasComponent } from './sudaderas/sudaderas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PantalonesComponent } from './pantalones/pantalones.component';
import { ZapatillasComponent } from './zapatillas/zapatillas.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { CartComponent } from './main/cart/cart.component';
import { DemoMaterialModule } from '../app/material-module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';




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
