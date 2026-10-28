import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-tabla-libros',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './tabla-libros.component.html',
  styleUrl: './tabla-libros.component.scss'
})
export class TablaLibrosComponent {
  private _libros: readonly Libro[] = [];

  // Componente presentacional: recibe información del padre, no consulta el servicio.
  @Input({ required: true }) set libros(valor: readonly Libro[]) {
    this._libros = valor ?? [];
  }

  get libros(): readonly Libro[] { return this._libros; }

  readonly columnas: string[] = ['id', 'titulo', 'categoria', 'autor', 'disponibles', 'acciones'];
}
