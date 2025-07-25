import sys
import os
from pathlib import Path

# Ajouter le répertoire parent au PYTHONPATH pour les imports
sys.path.insert(0, str(Path(__file__).parent.absolute()))

def init_db():
    """Initialise la base de données en créant toutes les tables"""
    from sqlalchemy import create_engine
    from core.database import Base
    from core.config import settings
    
    print("Initialisation de la base de données...")
    
    # Créer le moteur SQLAlchemy
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
    )
    
    # Créer toutes les tables
    print("Création des tables...")
    Base.metadata.create_all(bind=engine)
    
    print(f"Base de données initialisée avec succès à l'emplacement: {settings.DATABASE_URL}")

if __name__ == "__main__":
    init_db()
