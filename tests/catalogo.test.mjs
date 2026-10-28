import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const libros = JSON.parse(readFileSync(new URL('../src/app/data/catalogo-libros.json', import.meta.url), 'utf8'));
const servicio = readFileSync(new URL('../src/app/services/libro.service.ts', import.meta.url), 'utf8');
const tabla = readFileSync(new URL('../src/app/components/tabla-libros/tabla-libros.component.html', import.meta.url), 'utf8');
const home = readFileSync(new URL('../src/app/pages/home/home.component.html', import.meta.url), 'utf8');
const detalle = readFileSync(new URL('../src/app/pages/detalle-libro/detalle-libro.component.ts', import.meta.url), 'utf8');
const rutas = readFileSync(new URL('../src/app/app.routes.ts', import.meta.url), 'utf8');
const categorias = {'Programación':9, 'Bases de Datos':7, Redes:6, 'Ciencias Básicas':8};

test('CT-01: catálogo contiene exactamente 30 registros',()=> assert.equal(libros.length,30));
test('CT-02: los 30 códigos son únicos',()=> assert.equal(new Set(libros.map(l=>l.id)).size,30));
test('CT-03: IDs consecutivos LIB-001 a LIB-030',()=>libros.forEach((l,i)=>assert.equal(l.id,`LIB-${String(i+1).padStart(3,'0')}`)));
test('CT-04: categorías y cantidades coinciden con el documento oficial',()=>Object.entries(categorias).forEach(([cat,total])=>assert.equal(libros.filter(l=>l.categoria===cat).length,total)));
test('CT-05: todos los registros tienen datos completos y unidades válidas',()=>libros.forEach(l=>{assert.ok(l.titulo&&l.autor);assert.ok(Number.isInteger(l.disponibles)&&l.disponibles>=0)}));
test('CT-06: búsqueda por ID localiza LIB-017',()=>assert.deepEqual(libros.find(l=>l.id==='LIB-017'),{id:'LIB-017',titulo:'Computer Networking',categoria:'Redes',autor:'Kurose & Ross',disponibles:18}));
test('CT-07: un ID inexistente no produce registros',()=>assert.equal(libros.find(l=>l.id==='LIB-999'),undefined));
test('CT-08: filtro Redes devuelve 6 libros',()=>assert.equal(libros.filter(l=>l.categoria==='Redes').length,6));
test('CT-09: el servicio expone los 3 métodos solicitados',()=>['obtenerTodos','filtrarPorCategoria','buscarPorId'].forEach(m=>assert.match(servicio,new RegExp(m+'\\('))));
test('CT-10: tabla Angular Material y routerLink están definidos',()=>{assert.match(tabla,/mat-table/);assert.match(tabla,/mat-raised-button/);assert.match(tabla,/\[routerLink\]/)});
test('CT-11: home usa formulario Material y alimenta al hijo',()=>{assert.match(home,/mat-card/);assert.match(home,/mat-form-field/);assert.match(home,/mat-select/);assert.match(home,/\[libros\]/)});
test('CT-12: detalle obtiene ID con ActivatedRoute',()=>{assert.match(detalle,/ActivatedRoute/);assert.match(detalle,/paramMap/)});
test('CT-13: configuración incluye ruta /libro/:id',()=>assert.match(rutas,/libro\/:id/));
