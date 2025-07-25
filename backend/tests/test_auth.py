import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings
from core.database import Base, get_db
from main import app
from models.user import User, UserRole
from schemas.user import UserCreate

# Configuration de la base de données de test
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Surcharger la dépendance de base de données pour utiliser la base de test
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Configurer l'application de test
app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

# Données de test
TEST_USER_EMAIL = "test@example.com"
TEST_USER_PASSWORD = "testpassword123"
TEST_USER_FULL_NAME = "Test User"

def setup_module():
    """Configuration avant l'exécution des tests"""
    # Créer les tables dans la base de test
    Base.metadata.create_all(bind=engine)
    
    # Créer un utilisateur de test
    db = TestingSessionLocal()
    try:
        # Supprimer l'utilisateur s'il existe déjà
        db.query(User).filter(User.email == TEST_USER_EMAIL).delete()
        
        # Créer un nouvel utilisateur
        user = User(
            email=TEST_USER_EMAIL,
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # testpassword123
            full_name=TEST_USER_FULL_NAME,
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(user)
        db.commit()
    finally:
        db.close()

def teardown_module():
    """Nettoyage après l'exécution des tests"""
    # Supprimer toutes les tables
    Base.metadata.drop_all(bind=engine)

def test_login_success():
    """Test de connexion réussie"""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": TEST_USER_EMAIL, "password": "testpassword123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_credentials():
    """Test de connexion avec des identifiants invalides"""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": TEST_USER_EMAIL, "password": "wrongpassword"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 401
    assert "detail" in response.json()

def test_register_user():
    """Test d'inscription d'un nouvel utilisateur"""
    new_user_email = "newuser@example.com"
    user_data = {
        "email": new_user_email,
        "password": "newuser123",
        "full_name": "New User",
        "role": "acheteur"
    }
    
    # Supprimer l'utilisateur s'il existe déjà
    db = TestingSessionLocal()
    try:
        db.query(User).filter(User.email == new_user_email).delete()
        db.commit()
    finally:
        db.close()
    
    response = client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == new_user_email
    assert data["full_name"] == "New User"
    assert "id" in data
    assert "hashed_password" not in data  # Le mot de passe ne doit pas être renvoyé

def test_get_current_user():
    """Test de récupération du profil utilisateur connecté"""
    # Se connecter d'abord pour obtenir un token
    login_response = client.post(
        "/api/v1/auth/login",
        data={"username": TEST_USER_EMAIL, "password": "testpassword123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    token = login_response.json()["access_token"]
    
    # Récupérer le profil utilisateur
    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == TEST_USER_EMAIL
    assert data["full_name"] == TEST_USER_FULL_NAME