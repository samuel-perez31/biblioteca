# Abre la biblioteca directamente en Google Chrome.
# No usa servidor: la pagina se carga desde el propio archivo del disco.
$pagina = 'file:///' + (($PSScriptRoot + '\public\index.html') -replace '\\', '/')

$chrome = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
) | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1

if ($chrome) {
  Start-Process $chrome $pagina
} else {
  # Sin Chrome, se abre con el navegador predeterminado
  Start-Process $pagina
}
