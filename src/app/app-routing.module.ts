import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './main/cart/cart.component';
import { ContactComponent } from './main/footer/contact/contact.component';
import { PuntosComponent } from './Client/puntos/puntos.component';
import { QuienesSomosComponent } from './main/footer/quienes-somos/quienes-somos.component';
import { EmpleadoComponent } from './Employee/empleado/empleado.component';
import { IncidenciaComponent } from './Employee/incidencia/incidencia.component';
import { GestionarPuntosComponent } from './Employee/puntos/puntos.component';
import { AdminComponent } from './admin/admin.component';
import { PedidoComponent } from './Client/pedido/pedido.component';
import { PedidosComponent } from './Employee/pedidos/pedidos.component';
import { DetalleRopaComponent } from './Client/ropa/detalle-ropa/detalle-ropa.component';
import { RopaComponent } from './Client/ropa/ropa.component';
import { GestionarRopaComponent } from './Employee/gestionarropa/gestionarropa.component';
import { GestionarClientesComponent } from './admin/gestionar-clientes/gestionar-clientes.component';
import { GestionarIncidenciasComponent } from './admin/gestionar-incidencias/gestionar-incidencias.component';
import { NovedadesComponent } from './Client/novedades/novedades.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ropa', component: RopaComponent },
  { path: 'cart', component: CartComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'puntos', component: PuntosComponent },
  { path: 'inicio', component: EmpleadoComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'gestionarpuntos', component: GestionarPuntosComponent },
  { path: 'gestionarropa', component: GestionarRopaComponent },
  { path: 'abririncidencia', component: IncidenciaComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'gestionarpedidos', component: PedidosComponent },
  { path: 'gestionarusuarios', component: GestionarClientesComponent },
  { path: 'detalle-ropa/:id', component: DetalleRopaComponent },
  { path: 'gestionarincidencias', component: GestionarIncidenciasComponent },
  { path: 'novedades', component: NovedadesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
