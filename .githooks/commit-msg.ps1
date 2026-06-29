$ErrorActionPreference = 'Stop'

$repoRoot = (Get-Location).Path
$versionFile = Join-Path $repoRoot 'version.txt'

if (-not (Test-Path $versionFile)) {
  exit 0
}

$version = (Get-Content $versionFile -Raw).Trim()
if ($version -match '^(\d+)\.(\d+)$') {
  $major = [int]$matches[1]
  $minor = [int]$matches[2]
  $newMinor = $minor + 1
  $newVersion = "$major.$newMinor"
  Set-Content -Path $versionFile -Value $newVersion -NoNewline
  & git add -- $versionFile
}
