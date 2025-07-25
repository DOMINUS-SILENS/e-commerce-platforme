from fastapi import APIRouter

from .endpoints import auth, users

# Création du routeur API
api_router = APIRouter()

# Inclusion des routeurs d'endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
