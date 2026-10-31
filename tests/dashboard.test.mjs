import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const base = new URL('../src/app/', import.meta.url);
const libros = JSON.parse(readFileSync(new URL('data/catalogo-libros.json', base), 'utf8'));
const fuente = readFileSync(new URL('services/catalogo-estadisticas.ts', base), 'utf8');
const js = ts.transpileModule(fuente, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const porCategoria = mod.agruparUnidadesPorCategoria(libros);
const salud = mod.calcularSaludCatalogo(libros);

// Las pruebas que siguen ejecutan las funciones de transformación reales, no una réplica.
test('P10-01: cuatro categorías en orden del enunciado', () => assert.deepEqual(porCategoria.map(x => x.categoria), ['Programación','Bases de Datos','Redes','Ciencias Básicas']));
test('P10-02: suma correcta por categoría', () => assert.deepEqual(porCategoria.map(x => x.unidades), [89,70,68,120]));
test('P10-03: total del inventario', () => assert.equal(porCategoria.reduce((s,x) => s+x.unidades,0),347));
test('P10-04: umbral real: 14 críticos y 16 saludables', () => assert.deepEqual(salud,{criticos:14,saludables:16,total:30}));
test('P10-05: exactamente 10 unidades son saludables', () => assert.deepEqual(mod.calcularSaludCatalogo([{disponibles:9},{disponibles:10}]),{criticos:1,saludables:1,total:2}));
test('P10-06: catálogo vacío no produce divisiones ni datos inventados', () => assert.deepEqual(mod.calcularSaludCatalogo([]),{criticos:0,saludables:0,total:0}));
test('P10-07: agrupación vacía genera categorías con cero unidades', () => assert.deepEqual(mod.agruparUnidadesPorCategoria([]).map(x=>x.unidades),[0,0,0,0]));
const app = readFileSync(new URL('app.component.html',base),'utf8');
const dashTs = readFileSync(new URL('pages/dashboard/dashboard.component.ts',base),'utf8');
const dashHtml = readFileSync(new URL('pages/dashboard/dashboard.component.html',base),'utf8');
const routes = readFileSync(new URL('app.routes.ts',base),'utf8');
test('P10-08: App Shell conserva mat-toolbar, botones de rutas y router-outlet',()=>{assert.match(app,/mat-toolbar/);assert.match(app,/mat-button/);assert.match(app,/routerLink="\/dashboard"/);assert.match(app,/routerLink="\/"/);assert.match(app,/router-outlet/)});
test('P10-09: ruta /dashboard disponible',()=>assert.match(routes,/path: 'dashboard'/));
test('P10-10: uso explícito de @ViewChild y ngAfterViewInit',()=>{assert.match(dashTs,/@ViewChild\('canvasBarras'/);assert.match(dashTs,/@ViewChild\('canvasDona'/);assert.match(dashTs,/ngAfterViewInit\(\)/)});
test('P10-11: se emplean dos canvas y dos Chart',()=>{assert.match(dashHtml,/#canvasBarras/);assert.match(dashHtml,/#canvasDona/);assert.match(dashTs,/type: 'bar'/);assert.match(dashTs,/type: 'doughnut'/)});
test('P10-12: gráficos se liberan al desmontar el componente',()=>assert.match(dashTs,/ngOnDestroy\(\)/));
