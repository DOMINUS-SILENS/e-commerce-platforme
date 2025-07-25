import os
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Ajouter le répertoire parent au PYTHONPATH
sys.path.insert(0, str(Path(__file__).parent.parent.absolute()))

from core.config import settings
from core.database import Base, get_db
from main import app

# Configuration de la base de données de test
TEST_DATABASE_URL = "sqlite:///./test.db"

# Créer un moteur SQLAlchemy pour les tests
engine = create_engine(
    TEST_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Créer les tables de test
Base.metadata.create_all(bind=engine)

# Surcharger la dépendance de base de données pour utiliser la base de test
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Configurer l'application de test
app.dependency_overrides[get_db] = override_get_db

# Fixture pour le client de test
@pytest.fixture(scope="module")
def test_app():
    with TestClient(app) as test_client:
        yield test_client

# Fixture pour la session de base de données
@pytest.fixture(scope="function")
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    
    yield session
    
    session.close()
    transaction.rollback()
    connection.close()

# Fixture pour les données de test
@pytest.fixture(scope="function")
def test_user(db_session):
    from models.user import User, UserRole
    from core.security import get_password_hash
    
    # Créer un utilisateur de test
    user_data = {
        "email": "test@example.com",
        "hashed_password": get_password_hash("testpassword123"),
        "full_name": "Test User",
        "role": UserRole.ADMIN,
        "is_active": True
    }
    
    # Supprimer l'utilisateur s'il existe déjà
    db_session.query(User).filter(User.email == user_data["email"]).delete()
    db_session.commit()
    
    # Créer un nouvel utilisateur
    user = User(**user_data)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    return user

# Fixture pour le token d'authentification
@pytest.fixture(scope="function")
def auth_token(test_app, test_user):
    # Se connecter pour obtenir un token
    response = test_app.post(
        "/api/v1/auth/login",
        data={"username": test_user.email, "password": "testpassword123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    return response.json()["access_token"]

# Fixture pour les en-têtes d'authentification
@pytest.fixture(scope="function")
def auth_headers(auth_token):
    return {"Authorization": f"Bearer {auth_token}"}

# Nettoyage après les tests
def pytest_sessionfinish(session, exitstatus):
    """Nettoyer après l'exécution des tests"""
    # Supprimer le fichier de base de données de test s'il existe
    if os.path.exists("test.db"):
        os.remove("test.db")
