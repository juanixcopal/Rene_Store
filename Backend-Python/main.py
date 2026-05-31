import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import UPLOAD_DIR
from app.core.exceptions import (
    NotFoundError, ConflictError, UnauthorizedError,
    not_found_handler, conflict_handler, unauthorized_handler,
    http_exception_handler, global_exception_handler,
)
from app.database.connection import Base, engine, SessionLocal
from app.database.seed import seed_database
from app.routers import user_router, product_router, category_router

# Crear tablas y directorio de uploads
Base.metadata.create_all(bind=engine)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Poblar base de datos con datos iniciales
_db = SessionLocal()
try:
    seed_database(_db)
finally:
    _db.close()

app = FastAPI(title="Rene Store API", version="2.0.0 - Python FastAPI")

# CORS: permite headers personalizados 'token' y 'service' que usa el frontend Svelte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Archivos estáticos para imágenes subidas
app.mount("/static", StaticFiles(directory="static"), name="static")

# Manejadores globales de excepciones
app.add_exception_handler(NotFoundError, not_found_handler)
app.add_exception_handler(ConflictError, conflict_handler)
app.add_exception_handler(UnauthorizedError, unauthorized_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, global_exception_handler)

# Rutas
app.include_router(user_router.router)
app.include_router(product_router.router)
app.include_router(category_router.router)


@app.get("/")
def root():
    return {"message": "Rene Store API v2.0 - Python FastAPI", "docs": "/docs"}
