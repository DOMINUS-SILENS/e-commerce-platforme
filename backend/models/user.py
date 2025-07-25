from pydantic import BaseModel, validator
from typing import Literal, Optional
from sqlalchemy import Column, Integer, String
from backend.models.db import Base

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, index=True)
    password = Column(String)

# Import déjà présent plus haut
from backend.utils.validators import validate_password_strength
from pydantic import EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal['acheteur', 'vendeur', 'admin'] = 'acheteur'
    
    @validator('full_name')
    def validate_full_name(cls, v):
        if len(v.strip()) < 2:
            raise ValueError("Le nom complet est trop court")
        return v.strip()
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Le mot de passe doit contenir au moins 8 caractères")
        return v
    
    class Config:
        schema_extra = {
            "example": {
                "full_name": "John Doe",
                "email": "john.doe@example.com",
                "password": "Secure123!",
                "role": "acheteur"
            }
        }

class User(BaseModel):
    id: int
    full_name: str
    email: str
    role: Literal['admin', 'vendeur', 'acheteur']

    class Config:
        from_attributes = True