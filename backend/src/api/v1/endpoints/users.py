from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.core.database import get_db
from src.models.user import User, UserRole
from src.schemas.user import User as UserSchema, UserCreate, UserUpdate
from src.services.auth_service import auth_service
from src.services.user_service import UserService

router = APIRouter()

def check_admin_permissions(current_user: User) -> None:
    """Vérifie si l'utilisateur actuel est administrateur"""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès refusé: privilèges insuffisants"
        )

@router.get("/", response_model=List[UserSchema])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(auth_service.get_current_active_user),
    db: Session = Depends(get_db),
) -> Any:
    """
    Récupère une liste d'utilisateurs (réservé aux administrateurs).
    """
    check_admin_permissions(current_user)
    users = UserService.get_users(db, skip=skip, limit=limit)
    return users

@router.post("/", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
    current_user: User = Depends(auth_service.get_current_active_user),
) -> Any:
    """
    Crée un nouvel utilisateur (réservé aux administrateurs).
    """
    check_admin_permissions(current_user)
    
    # Vérifier si l'email est déjà utilisé
    db_user = UserService.get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cet email est déjà utilisé"
        )
    
    # Créer l'utilisateur
    user = UserService.create_user(db=db, user_in=user_in)
    return user

@router.get("/{user_id}", response_model=UserSchema)
async def read_user(
    user_id: int,
    current_user: User = Depends(auth_service.get_current_active_user),
    db: Session = Depends(get_db),
) -> Any:
    """
    Récupère un utilisateur par son ID.
    Un utilisateur ne peut voir que son propre profil, sauf s'il est administrateur.
    """
    if current_user.role != UserRole.ADMIN and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès non autorisé à cet utilisateur"
        )
    
    db_user = UserService.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    return db_user

@router.put("/{user_id}", response_model=UserSchema)
async def update_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    user_in: UserUpdate,
    current_user: User = Depends(auth_service.get_current_active_user),
) -> Any:
    """
    Met à jour un utilisateur.
    Un utilisateur ne peut mettre à jour que son propre profil, sauf s'il est administrateur.
    """
    if current_user.role != UserRole.ADMIN and current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès non autorisé à cet utilisateur"
        )
    
    db_user = UserService.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Vérifier si l'email est déjà utilisé par un autre utilisateur
    if user_in.email and user_in.email != db_user.email:
        existing_user = UserService.get_user_by_email(db, email=user_in.email)
        if existing_user and existing_user.id != user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cet email est déjà utilisé"
            )
    
    # Mettre à jour l'utilisateur
    user_updated = UserService.update_user(
        db=db, 
        db_user=db_user, 
        user_in=user_in,
        update_password=user_in.password is not None
    )
    
    return user_updated

@router.delete("/{user_id}", response_model=UserSchema)
async def delete_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    current_user: User = Depends(auth_service.get_current_active_user),
) -> Any:
    """
    Supprime un utilisateur (réservé aux administrateurs).
    """
    check_admin_permissions(current_user)
    
    # Un administrateur ne peut pas se supprimer lui-même
    if current_user.id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un administrateur ne peut pas se supprimer lui-même"
        )
    
    db_user = UserService.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Supprimer l'utilisateur
    return UserService.delete_user(db=db, user_id=user_id)
