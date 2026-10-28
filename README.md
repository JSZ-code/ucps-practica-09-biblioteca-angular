# Práctica 9 | Catálogo de Biblioteca Universitaria

**Universidad Nacional de San Agustín de Arequipa · UCPS · Desarrollo de Aplicaciones Empresariales**

Aplicación **Angular 20 (Standalone Components)** + **Angular Material** para consultar un catálogo **estático de 30 libros**, filtrarlo por categoría y navegar a fichas con rutas `/libro/:id`.

## Requisitos

- Node.js 20.19+, 22.12+ o versión de soporte equivalente compatible con Angular 20.
- npm, Git, conexión a internet para instalar dependencias.

## Ejecución

```powershell
npm install
npm run test:catalogo
npm run build
npm start
```

Abrir `http://localhost:4200/` y realizar la prueba `http://localhost:4200/libro/LIB-017`.

## Arquitectura y principios

```
src/app/
  data/catalogo-libros.json              30 registros del documento oficial
  models/libro.model.ts                   interfaz Libro + tipo CategoriaLibro
  services/libro.service.ts               obtenerTodos, filtrarPorCategoria, buscarPorId
  components/tabla-libros/                Dumb (@Input setter, mat-table, routerLink)
  pages/home/                             Smart (MatCard, MatFormField, MatSelect)
  pages/detalle-libro/                    ActivatedRoute, MatCard, volver
  app.routes.ts                           / y /libro/:id
```

El buscador de texto por título/autor/código es mejora adicional. El servicio mantiene el catálogo en memoria, sin base de datos ni backend, tal como indica la práctica.

## Pruebas y evidencias

Ejecutar `npm run test:catalogo`, `npm run build` y validar manualmente los casos en [`docs/MATRIZ_EVIDENCIAS.md`](docs/MATRIZ_EVIDENCIAS.md). **No confundir una prueba de datos/estructura con una compilación ni con una captura de la aplicación realmente funcionando.**

## Entrega

- Crear repositorio **público** `ucps-practica-09-biblioteca-angular` en la cuenta JSZ-code.
- Publicar todo el proyecto en la raíz, conservando `.gitignore`, sin `node_modules`.
- Incorporar a Word/PDF: enlace público, Home con 30 libros, filtro Redes con 6, ficha `LIB-017` con la URL visible.
- La plataforma Moodle muestra «un archivo cargado / Word» mientras que la guía adjunta requiere PDF. Se suministran ambos formatos para que el estudiante elija el aceptado.

## Nota de auditoría

La existencia de código no prueba que el build ni la ejecución estén aprobados. Registra fechas, capturas y logs antes de informar PASS.
