$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {throw 'Git no está instalado.'}
if (-not (Test-Path '.git')) {git init -b main}
if (-not (git config user.name)) {throw 'Configure git config user.name antes de continuar'}
if (-not (git config user.email)) {throw 'Configure git config user.email antes de continuar'}
if (git log -1 --oneline 2>$null) {Write-Host 'Ya hay commits. No se duplican.'; exit 0}
# Commits progresivos y verificables, sin node_modules.
git add .gitignore package.json angular.json tsconfig.json tsconfig.app.json src/app/models src/app/data src/app/services
if (Test-Path "package-lock.json") { git add package-lock.json }
 git commit -m 'feat: agregar catálogo oficial de 30 libros y LibroService'
if ($LASTEXITCODE -ne 0) {throw 'Fallo el primer commit'}
git add src/app/pages src/app/components src/app/app* src/main.ts src/index.html src/styles.scss public
 git commit -m 'feat: catálogo Angular Material, filtros y detalle por ruta'
if ($LASTEXITCODE -ne 0) {throw 'Fallo el segundo commit'}
git add README.md docs scripts tests .github
 git commit -m 'test: agregar validaciones y documentación de entrega'
if ($LASTEXITCODE -ne 0) {throw 'Fallo el tercer commit'}
git status --short
git log --oneline -3
