from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from .model import Base
import os
from dotenv import load_dotenv

load_dotenv()

# username:password@hostname:port/db_name
URL_DATABASE = os.getenv("URL_DATABASE")
# URL_DATABASE = "sqlite://"
engine = create_engine(URL_DATABASE, isolation_level="SERIALIZABLE")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()