param(
  [ValidateSet('version','login','preview','deploy')]
  [string]$Action = 'version'
)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { 'C:/Users/eroom/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' }
$cliPath = Join-Path $PSScriptRoot 'node_modules/vercel/dist/index.js'
if (-not (Test-Path -LiteralPath $cliPath)) { throw 'Vercel CLI is not installed.' }
switch ($Action) {
  'version' { & $nodePath $cliPath --version }
  'login' { & $nodePath $cliPath login }
  'preview' { & $nodePath $cliPath deploy --cwd dist }
  'deploy' { & $nodePath $cliPath deploy --prod --cwd dist }
}
exit $LASTEXITCODE
