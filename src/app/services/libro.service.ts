import { Injectable } from '@angular/core';
import { Libro, CategoriaLibro } from '../models/libro.model';
import catalogoJson from '../data/catalogo-libros.json';

@Injectable({ providedIn: 'root' })
export class LibroService {
  // Fuente estática única: exactamente los 30 libros proporcionados por el docente.
  private readonly catalogoLibros: readonly Libro[] = catalogoJson as Libro[];

  obtenerTodos(): Libro[] {
    return [...this.catalogoLibros];
  }

  filtrarPorCategoria(categoria: CategoriaLibro | 'Todas'): Libro[] {
    return categoria === 'Todas'
      ? this.obtenerTodos()
      : this.catalogoLibros.filter(libro => libro.categoria === categoria);
  }

  buscarPorId(id: string): Libro | undefined {
    return this.catalogoLibros.find(libro => libro.id === id);
  }
}
