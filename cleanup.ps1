# Cleanup Script for E-Commerce Platform

# Define the root directory
$rootDir = "."

# Directories to remove
$dirsToRemove = @(
    "*\node_modules",
    "*\dist",
    "*\build",
    "*\.next",
    "*\out",
    "*\.vercel",
    "*\.netlify",
    "*\.cache",
    "*\.svelte-kit",
    "*\.svelte",
    "*\.nuxt",
    "*\.output",
    "*\.docusaurus",
    "*\.expo",
    "*\.expo-shared",
    "*\.expo-web",
    "*\coverage",
    "*\__pycache__"
)

# Files to remove
$filesToRemove = @(
    "*\package-lock.json",
    "*\yarn.lock",
    "*\pnpm-lock.yaml",
    "*\*.log",
    "*\*.tmp",
    "*\*.bak",
    "*\*.swp",
    "*\*~",
    "*\.DS_Store",
    "*\Thumbs.db"
)

Write-Host "Starting cleanup process..." -ForegroundColor Green

# Remove directories
foreach ($dir in $dirsToRemove) {
    $fullPath = Join-Path $rootDir $dir
    $items = Get-ChildItem -Path $fullPath -Directory -Recurse -Force -ErrorAction SilentlyContinue
    
    if ($items) {
        Write-Host "Removing $($items.Count) directories matching: $dir" -ForegroundColor Yellow
        $items | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Remove files
foreach ($file in $filesToRemove) {
    $fullPath = Join-Path $rootDir $file
    $items = Get-ChildItem -Path $fullPath -File -Recurse -Force -ErrorAction SilentlyContinue
    
    if ($items) {
        Write-Host "Removing $($items.Count) files matching: $file" -ForegroundColor Yellow
        $items | Remove-Item -Force -ErrorAction SilentlyContinue
    }
}

# Clean npm cache
Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Clean pip cache if exists
if (Test-Path "$rootDir\backend\venv") {
    Write-Host "Cleaning pip cache..." -ForegroundColor Yellow
    & "$rootDir\backend\venv\Scripts\python.exe" -m pip cache purge
}

Write-Host "Cleanup completed!" -ForegroundColor Green
