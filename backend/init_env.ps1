<#
.SYNOPSIS
    Initialise l'environnement de développement pour le backend E-Commerce
.DESCRIPTION
    Ce script :
    1. Vérifie si le fichier .env existe, sinon le crée à partir de .env.example
    2. Définit les variables d'environnement nécessaires
    3. Initialise la base de données
#>

# Configuration
$envFile = ".env"
$envExampleFile = ".env.example"

# Vérifier si .env existe, sinon le créer
if (-not (Test-Path $envFile)) {
    if (Test-Path $envExampleFile) {
        Write-Host "Création du fichier $envFile à partir de $envExampleFile..." -ForegroundColor Cyan
        Copy-Item $envExampleFile -Destination $envFile
        Write-Host "Fichier $envFile créé. Veuillez configurer les variables d'environnement." -ForegroundColor Yellow
    } else {
        Write-Error "Le fichier $envExampleFile est introuvable. Impossible de créer $envFile"
        exit 1
    }
}

# Charger les variables d'environnement
Write-Host "Chargement des variables d'environnement..." -ForegroundColor Cyan
Get-Content .env | ForEach-Object {
    $name, $value = $_.split('=', 2)
    if ($name -and $value) {
        [System.Environment]::SetEnvironmentVariable($name, $value.Trim('"'))
    }
}

# Vérifier Python et les dépendances
Write-Host "Vérification de Python et des dépendances..." -ForegroundColor Cyan
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    $python = Get-Command python3 -ErrorAction SilentlyContinue
    if (-not $python) {
        Write-Error "Python n'est pas installé ou n'est pas dans le PATH"
        exit 1
    }
}

# Installer les dépendances si nécessaire
Write-Host "Installation des dépendances Python..." -ForegroundColor Cyan
& $python -m pip install --upgrade pip
& $python -m pip install -e .
& $python -m pip install -e ".[dev]"

# Initialiser la base de données
Write-Host "Initialisation de la base de données..." -ForegroundColor Cyan
$env:PYTHONPATH = "src"
& $python -m src.db.init_db --force

Write-Host "`n✅ Initialisation terminée avec succès !" -ForegroundColor Green
Write-Host "Pour démarrer le serveur :" -ForegroundColor Cyan
Write-Host "  uvicorn src.main:app --reload" -ForegroundColor White
Write-Host "`nAccédez à l'API : http://localhost:8000" -ForegroundColor Cyan
Write-Host "Documentation : http://localhost:8000/docs" -ForegroundColor Cyan
