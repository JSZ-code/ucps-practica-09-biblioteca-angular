import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LibroService } from '../../services/libro.service';
import { Libro, CategoriaLibro } from '../../models/libro.model';
import { TablaLibrosComponent } from '../../components/tabla-libros/tabla-libros.component';

type FiltroCategoria = CategoriaLibro | 'Todas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, TablaLibrosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly servicio = inject(LibroService);

  readonly categorias: readonly FiltroCategoria[] = ['Todas', 'Programación', 'Bases de Datos', 'Redes', 'Ciencias Básicas'];
  categoriaSeleccionada: FiltroCategoria = 'Todas';
  terminoBusqueda = '';
  librosFiltrados: Libro[] = this.servicio.obtenerTodos();

  get cantidadTotal(): number { return this.servicio.obtenerTodos().length; }
  get unidadesTotales(): number { return this.servicio.obtenerTodos().reduce((total, libro) => total + libro.disponibles, 0); }
  get categoriasTotales(): number { return this.categorias.length - 1; }

  aplicarFiltros(): void {
    const texto = this.terminoBusqueda.trim().toLocaleLowerCase('es');
    const porCategoria = this.servicio.filtrarPorCategoria(this.categoriaSeleccionada);
    this.librosFiltrados = texto
      ? porCategoria.filter(libro => [libro.id, libro.titulo, libro.autor].some(valor => valor.toLocaleLowerCase('es').includes(texto)))
      : porCategoria;
  }

  limpiarFiltros(): void {
    this.categoriaSeleccionada = 'Todas';
    this.terminoBusqueda = '';
    this.aplicarFiltros();
  }
}
