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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SudaderasComponent } from './sudaderas/sudaderas.component';


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
      SudaderasComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
