from fastapi import Header, HTTPException
from jose import JWTError
from app.core.security import decode_token


def get_current_user(token: str = Header(...)):
    try:
        return decode_token(token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")


def require_admin(token: str = Header(...)):
    try:
        payload = decode_token(token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    if payload.get("rol") != "Administrador":
        raise HTTPException(status_code=403, detail="Se requiere rol de Administrador")
    return payload
