from models import Base
from models.db import engine

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Database tables created.") 