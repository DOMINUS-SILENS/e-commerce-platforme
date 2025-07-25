#!/usr/bin/env python3
"""
Script de lancement du backend FastAPI avec rechargement automatique.

Ce script doit être exécuté depuis la racine du projet :
    python run_backend.py
"""
import uvicorn
import os
from pathlib import Path

# Configuration du port et de l'hôte
HOST = "0.0.0.0"
PORT = 8000

# Définition des variables d'environnement pour le mode développement
os.environ["ENV"] = "development"
os.environ["PYTHONPATH"] = str(Path(__file__).parent.absolute())

def main():
    """Lance le serveur FastAPI avec rechargement automatique."""
    print(f"[INFO] Démarrage du serveur FastAPI sur http://{HOST}:{PORT}")
    print(f"[INFO] Mode: {'Développement' if os.getenv('ENV') == 'development' else 'Production'}")
    
    uvicorn.run(
        "backend.main:app",
        host=HOST,
        port=PORT,
        reload=True,
        reload_dirs=["backend"],
        reload_includes=["*.py"],
        reload_excludes=["*.pyc", "__pycache__"],
        log_level="info"
    )

if __name__ == "__main__":
    main()
