import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalleLibroComponent } from './pages/detalle-libro/detalle-libro.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Catálogo | UCPS Biblioteca' },
  { path: 'libro/:id', component: DetalleLibroComponent, title: 'Ficha de libro | UCPS Biblioteca' },
  { path: '**', redirectTo: '' }
];
