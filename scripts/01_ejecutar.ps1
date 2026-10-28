$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz
Write-Host "==== UCPS PRACTICA 9 ====" -ForegroundColor Cyan
Write-Host "Ruta: $raiz"
foreach ($cmd in @('node','npm','git')) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { throw "Falta instalar $cmd en PATH" }
}
node -v
npm -v
git --version
Write-Host 'Instalando dependencias npm...' -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {throw 'Fallo npm install. Verifique su conexión a internet y Node 20.19+/22.12+.'}
Write-Host 'Ejecutando pruebas de catálogo...' -ForegroundColor Cyan
npm run test:catalogo
if ($LASTEXITCODE -ne 0) {throw 'Fallo test:catalogo'}
Write-Host 'Compilando Angular...' -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {throw 'Fallo ng build'}
Write-Host 'Iniciando Angular en localhost:4200 ...' -ForegroundColor Green
npm start
