import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    """Base configuration"""

    # Use local database when ON_RENDER is false
    if os.getenv("ON_RENDER") == "true":
        SQLALCHEMY_DATABASE_URI = os.getenv("INTERNAL_DATABASE_URL")  # Render DB
    else:
        SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # Local Docker DB

    # Disable modification tracking for performance
    SQLALCHEMY_TRACK_MODIFICATIONS = False
