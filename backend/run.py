#!/usr/bin/env python3
"""
Script de démarrage du serveur FastAPI.
Ce script configure et lance le serveur avec les paramètres appropriés.
"""
import os
import sys
import uvicorn
from pathlib import Path

# Ajouter le répertoire parent au PYTHONPATH pour les imports
sys.path.insert(0, str(Path(__file__).parent.absolute()))

def main():
    """Lance le serveur FastAPI avec les paramètres de configuration."""
    # Configuration du serveur
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    reload = os.getenv("DEBUG", "true").lower() == "true"
    
    print(f"[INFO] Démarrage du serveur FastAPI sur http://{host}:{port}")
    print(f"[INFO] Mode: {'Développement' if reload else 'Production'}")
    
    # Démarrer le serveur
    uvicorn.run(
        "src.main:app",
        host=host,
        port=port,
        reload=reload,
        log_level="debug" if reload else "info",
        workers=1 if reload else None
    )

if __name__ == "__main__":
    main()
