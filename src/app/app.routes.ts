import { Routes } from '@angular/router';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarConTablaComponent } from './components/listar-con-tabla/listar-con-tabla.component';
import { BusquedaDeLibrosCampoComponent } from './components/busqueda-de-libros-campo/busqueda-de-libros-campo.component';
import { EditarLibroComponent } from './components/editar-libro/editar-libro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PruebaBdComponent } from './components/prueba-bd/prueba-bd.component';




export const routes: Routes = [

  { path: 'crear-libro', component: CrearLibroComponent },
  { path: 'listar-tabla', component: ListarConTablaComponent },
  { path: 'filtrar', component: BusquedaDeLibrosCampoComponent },
  { path: 'editar', component: EditarLibroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'prueba', component: PruebaBdComponent },
  { path: '', redirectTo: 'listar-tabla', pathMatch: 'full' },

];
