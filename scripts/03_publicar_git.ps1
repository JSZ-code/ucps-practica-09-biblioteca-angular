$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
$repo = 'https://github.com/JSZ-code/ucps-practica-09-biblioteca-angular.git'
if (-not (Test-Path '.git')) {throw 'Primero ejecute 02_preparar_git.ps1'}
$remoto = git remote get-url origin 2>$null
if ($remoto -and $remoto -ne $repo) {throw "origin apunta a otra URL ($remoto). No se modificará automáticamente."}
if (-not $remoto) {git remote add origin $repo}
git push -u origin main
if ($LASTEXITCODE -ne 0) {throw 'No se pudo publicar. Cree antes el repositorio PÚBLICO y compruebe su autenticación.'}
Write-Host "Publicación completada: $repo" -ForegroundColor Green
