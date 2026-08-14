$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $PSScriptRoot

$runtimeRoot = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies"
$nodeDir = Join-Path $runtimeRoot "node\bin"
$nodeExe = Join-Path $nodeDir "node.exe"
$pnpmCmd = Join-Path $runtimeRoot "bin\fallback\pnpm.cmd"
$astroState = Join-Path $PSScriptRoot ".astro-runtime"

if (-not (Test-Path -LiteralPath $nodeExe)) {
  Write-Host "Node 22+ is required. Install it with: nvm install 24" -ForegroundColor Red
  Write-Host "Then run: nvm use 24" -ForegroundColor Yellow
  exit 1
}

if (-not (Test-Path -LiteralPath $pnpmCmd)) {
  Write-Host "pnpm was not found. Run: corepack enable" -ForegroundColor Red
  Write-Host "Then run: corepack prepare pnpm@11.16.0 --activate" -ForegroundColor Yellow
  exit 1
}

$env:PATH = "$nodeDir;$(Split-Path $pnpmCmd);$env:PATH"
$env:ASTRO_TELEMETRY_DISABLED = "1"
$env:npm_node_execpath = $nodeExe
$env:APPDATA = $astroState
New-Item -ItemType Directory -Path $astroState -Force | Out-Null

function Test-CaesarServer {
  $client = [System.Net.Sockets.TcpClient]::new()
  try {
    $pending = $client.ConnectAsync("127.0.0.1", 4321)
    return $pending.Wait(500) -and $client.Connected
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

Write-Host "CAESAR STUDIO" -ForegroundColor DarkYellow

if (Test-CaesarServer) {
  Write-Host "The website is already running." -ForegroundColor Green
  Write-Host "Open: http://localhost:4321" -ForegroundColor Cyan
  exit 0
}

Write-Host "Installing verified dependencies..." -ForegroundColor Gray
& $pnpmCmd install --frozen-lockfile
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Starting: http://localhost:4321" -ForegroundColor Green
Write-Host "Keep this window open. Press Ctrl+C to stop the website." -ForegroundColor DarkGray
& $pnpmCmd dev --host localhost --port 4321
