$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

$runtimeRoot = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies"
$nodeDir = Join-Path $runtimeRoot "node\bin"
$pnpmDir = Join-Path $runtimeRoot "bin\fallback"
$astroCmd = Join-Path $PSScriptRoot "node_modules\.bin\astro.cmd"
$astroState = Join-Path $PSScriptRoot ".astro-runtime"

if (-not (Test-Path -LiteralPath $astroCmd)) {
  Write-Host "Astro is not installed in this project." -ForegroundColor Red
  exit 1
}

$env:PATH = "$nodeDir;$pnpmDir;$env:PATH"
$env:ASTRO_TELEMETRY_DISABLED = "1"
$env:APPDATA = $astroState
New-Item -ItemType Directory -Path $astroState -Force | Out-Null

& $astroCmd dev stop
if ($LASTEXITCODE -eq 0) {
  Write-Host "CAESAR STUDIO server stopped." -ForegroundColor Green
}
