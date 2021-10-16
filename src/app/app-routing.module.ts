import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PantalonesComponent } from './pantalones/pantalones.component';
import { SudaderasComponent } from './sudaderas/sudaderas.component';
import { ZapatillasComponent } from './zapatillas/zapatillas.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sudaderas', component: SudaderasComponent },
  { path: 'pantalones', component: PantalonesComponent },
  { path: 'zapatillas', component: ZapatillasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
