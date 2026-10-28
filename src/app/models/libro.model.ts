export type CategoriaLibro = 'Programación' | 'Bases de Datos' | 'Redes' | 'Ciencias Básicas';

export interface Libro {
  readonly id: string;
  readonly titulo: string;
  readonly categoria: CategoriaLibro;
  readonly autor: string;
  readonly disponibles: number;
}
