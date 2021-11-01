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
import { PuntosComponent } from './Client/puntos/puntos.component';
import { QuienesSomosComponent } from './Main/footer/quienes-somos/quienes-somos.component';
import { EmpleadoComponent } from './Employee/empleado/empleado.component';
import { PedidosComponent } from './Employee/pedidos/pedidos.component';
import { RopaComponent } from './Employee/ropa/ropa.component';
import { IncidenciaComponent } from './Employee/incidencia/incidencia.component';
import { GestionarPuntosComponent } from './Employee/puntos/puntos.component';
import { AdminComponent } from './admin/admin.component';
import { RegistroComponent } from './Main/registro/registro.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'sudaderas', component: SudaderasComponent },
  { path: 'pantalones', component: PantalonesComponent },
  { path: 'zapatillas', component: ZapatillasComponent },
  { path: 'accesorios', component: AccesoriosComponent },
  { path: 'cart', component: CartComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'puntos', component: PuntosComponent },
  { path: 'inicio', component: EmpleadoComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'ropa', component: RopaComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'gestionarpuntos', component: GestionarPuntosComponent },
  { path: 'incidencia', component: IncidenciaComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
