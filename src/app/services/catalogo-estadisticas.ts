import type { CategoriaLibro, Libro } from '../models/libro.model';

export interface InventarioCategoria {
  readonly categoria: CategoriaLibro;
  readonly unidades: number;
}

export interface SaludCatalogo {
  readonly criticos: number;
  readonly saludables: number;
  readonly total: number;
}

const CATEGORIAS: readonly CategoriaLibro[] = [
  'Programación', 'Bases de Datos', 'Redes', 'Ciencias Básicas'
];

/** Transformación ETL simulada en frontend: categoría -> suma de unidades. */
export function agruparUnidadesPorCategoria(libros: readonly Libro[]): InventarioCategoria[] {
  return CATEGORIAS.map(categoria => ({
    categoria,
    unidades: libros
      .filter(libro => libro.categoria === categoria)
      .reduce((acumulado, libro) => acumulado + libro.disponibles, 0)
  }));
}

/** El umbral del docente es estricto: < 10 crítico; >= 10 saludable. */
export function calcularSaludCatalogo(libros: readonly Libro[]): SaludCatalogo {
  const criticos = libros.filter(libro => libro.disponibles < 10).length;
  const saludables = libros.filter(libro => libro.disponibles >= 10).length;
  return { criticos, saludables, total: libros.length };
}
