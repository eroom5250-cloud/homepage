param(
  [ValidateSet('version', 'login', 'status', 'preview', 'deploy')]
  [string]$Action = 'version'
)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else { 'C:/Users/eroom/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' }
$cliPath = Join-Path $PSScriptRoot 'node_modules/netlify-cli/bin/run.js'
if (-not (Test-Path -LiteralPath $cliPath)) { throw 'Netlify CLI is not installed.' }
switch ($Action) {
  'version' { & $nodePath $cliPath --version }
  'login' { & $nodePath $cliPath login }
  'status' { & $nodePath $cliPath status }
  'preview' { & $nodePath $cliPath deploy --dir=dist --no-build }
  'deploy' { & $nodePath $cliPath deploy --prod --dir=dist --no-build }
}
exit $LASTEXITCODE
