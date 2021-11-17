import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { MainComponent } from './main/main.component';
import { PantalonesComponent } from './Client/pantalones/pantalones.component';
import { SudaderasComponent } from './Client/sudaderas/sudaderas.component';
import { ZapatillasComponent } from './Client/zapatillas/zapatillas.component';
import { AccesoriosComponent } from './Client/accesorios/accesorios.component';
import { CartComponent } from './main/cart/cart.component';
import { ContactComponent } from './main/footer/contact/contact.component';
import { PuntosComponent } from './Client/puntos/puntos.component';
import { QuienesSomosComponent } from './main/footer/quienes-somos/quienes-somos.component';
import { EmpleadoComponent } from './Employee/empleado/empleado.component';
import { RopaComponent } from './Employee/ropa/ropa.component';
import { IncidenciaComponent } from './Employee/incidencia/incidencia.component';
import { GestionarPuntosComponent } from './Employee/puntos/puntos.component';
import { AdminComponent } from './admin/admin.component';
import { RegistroComponent } from './main/registro/registro.component';
import { PedidoComponent } from './Client/pedido/pedido.component';
import { PedidosComponent } from './Employee/pedidos/pedidos.component';
import { DetalleSudaderaComponent } from './Client/sudaderas/detalle-sudadera/detalle-sudadera.component';

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
  { path: 'ropa', component: RopaComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'gestionarpuntos', component: GestionarPuntosComponent },
  { path: 'incidencia', component: IncidenciaComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'gestionarpedidos', component: PedidosComponent},
  { path: 'detalle-sudadera/:id', component: DetalleSudaderaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
