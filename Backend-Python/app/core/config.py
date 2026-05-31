import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "rene_store_python_secret_2024")
JWT_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRE_HOURS", "6"))
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./rene_store.db")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "static/uploads")
SERVER_URL = os.getenv("SERVER_URL", "http://localhost:3050")
