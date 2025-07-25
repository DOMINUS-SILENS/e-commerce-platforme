"""
Models package for the E-Commerce platform.

This package contains all the database models used in the application.
"""

# Import models to make them available when importing from models
from .user import User, UserRole  # This now re-exports from db.models

# Import database models
from src.db.base_class import Base
from src.db.init_db import init_db

__all__ = ["User", "UserRole", "Base", "init_db"]
