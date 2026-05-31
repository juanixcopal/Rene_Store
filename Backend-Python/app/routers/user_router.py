from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services.user_service import UserService
from app.core.dependencies import get_current_user, require_admin
from app.schemas.auth_schema import LoginRequest, RegisterRequest
from app.schemas.user_schema import UserCreateRequest, UserEditRequest
from app.helpers import fmt_user

router = APIRouter(prefix="/api/user", tags=["Usuarios"])


@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    return UserService(db).login(body.email, body.password)


@router.post("/register")
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    return UserService(db).register(body.model_dump())


@router.get("/query")
def get_users(
    service: str = Header(...),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    role_name = "Administrador" if service == "all-admin-users" else "Usuario"
    users = UserService(db).get_by_role(role_name)
    return [fmt_user(u) for u in users]


@router.post("/manager")
def create_user(
    body: UserCreateRequest,
    service: str = Header(...),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    user = UserService(db).create_user(body.model_dump())
    return {**fmt_user(user), "message": "Usuario creado exitosamente"}


@router.put("/manager")
def edit_user(
    body: UserEditRequest,
    service: str = Header(...),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    user = UserService(db).edit_user(body.model_dump())
    return {**fmt_user(user), "message": "Usuario actualizado exitosamente"}
