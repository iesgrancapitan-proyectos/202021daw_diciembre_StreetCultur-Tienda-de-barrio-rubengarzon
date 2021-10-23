import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Main/login/login.component';
import { MainComponent } from './Main/main.component';
import { PantalonesComponent } from './Client/pantalones/pantalones.component';
import { SudaderasComponent } from './Client/sudaderas/sudaderas.component';
import { ZapatillasComponent } from './Client/zapatillas/zapatillas.component';
import { AccesoriosComponent } from './Client/accesorios/accesorios.component';
import { CartComponent } from './Main/cart/cart.component';
import { ContactComponent } from './Main/footer/contact/contact.component';
import { HeaderEmployeeComponent } from './Employee/header-employee/header-employee.component';
import { PuntosComponent } from './Client/puntos/puntos.component';
import { QuienesSomosComponent } from './Main/footer/quienes-somos/quienes-somos.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sudaderas', component: SudaderasComponent },
  { path: 'pantalones', component: PantalonesComponent },
  { path: 'zapatillas', component: ZapatillasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'cart', component: CartComponent },
  { path: 'empleado', component: HeaderEmployeeComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'puntos', component: PuntosComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
