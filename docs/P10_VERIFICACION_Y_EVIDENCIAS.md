# UCPS - Práctica 10 | Plan de validación

Se amplía el **mismo** proyecto de la Práctica 9. El enunciado requiere Angular Material, Chart.js, `@ViewChild`, `ngAfterViewInit`, dos gráficos y menú global.

## Control de referencia (calculado sobre el JSON de los 30 libros)

- Programación: 89 unidades
- Bases de Datos: 70 unidades
- Redes: 68 unidades
- Ciencias Básicas: 120 unidades
- Total: 347 unidades
- Críticos (<10): 14 libros
- Saludables (>=10): 16 libros

## Ejecución y pruebas en Windows

```powershell
npm.cmd install chart.js@^4
npm.cmd run test:catalogo
npm.cmd run test:dashboard
npm.cmd run build
npm.cmd start
```

## Evidencias pendientes (obtener imágenes REALES del navegador)

- E10-01: barra superior `Catálogo` y `Dashboard`; navegar entre ambas vistas
- E10-02: dashboard con gráfico de barras (89 / 70 / 68 / 120)
- E10-03: gráfico de dona (14 críticos / 16 saludables)
- E10-04: resultado `npm.cmd run test:dashboard` y `npm.cmd run build`
- E10-05: GitHub, repositorio actualizado y commit nuevo (después de validar)

La Práctica 10 simula ETL con operaciones en TypeScript sobre el servicio local. No usa todavía el microservicio de Python ni MySQL, que corresponden al proyecto final.
