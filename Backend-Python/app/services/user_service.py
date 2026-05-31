from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository, RoleRepository
from app.core.security import create_access_token, hash_password, verify_password
from app.core.exceptions import NotFoundError, ConflictError, UnauthorizedError


class UserService:
    def __init__(self, db: Session):
        self.user_repo = UserRepository(db)
        self.role_repo = RoleRepository(db)

    def login(self, email: str, password: str) -> dict:
        user = self.user_repo.find_by_email(email)
        if not user or not verify_password(password, user.password):
            raise UnauthorizedError("Credenciales incorrectas")
        return {"token": self._make_token(user)}

    def register(self, data: dict) -> dict:
        if self.user_repo.find_by_email(data["email"]):
            raise ConflictError("El email ya está registrado")
        role = self.role_repo.find_by_name("Usuario")
        user = self.user_repo.create({
            "user_name": data["user_name"],
            "user_lastname": data["user_lastname"],
            "email": data["email"],
            "password": hash_password(data["password"]),
            "rol_id": role.id,
        })
        return {"token": self._make_token(user)}

    def get_by_role(self, role_name: str):
        return self.user_repo.find_all_by_role(role_name)

    def create_user(self, data: dict):
        if self.user_repo.find_by_email(data["email"]):
            raise ConflictError("El email ya está registrado")
        role = self.role_repo.find_by_name(data["rol"])
        if not role:
            raise NotFoundError(f"Rol '{data['rol']}' no encontrado")
        return self.user_repo.create({
            "user_name": data["user_name"],
            "user_lastname": data["user_lastname"],
            "email": data["email"],
            "password": hash_password(data["password"]),
            "rol_id": role.id,
        })

    def edit_user(self, data: dict):
        user = self.user_repo.find_by_id(int(data["id"]))
        if not user:
            raise NotFoundError("Usuario no encontrado")
        if data["email"] != user.email and self.user_repo.find_by_email(data["email"]):
            raise ConflictError("El email ya está en uso")
        role = self.role_repo.find_by_name(data["rol"])
        if not role:
            raise NotFoundError(f"Rol '{data['rol']}' no encontrado")
        update = {
            "user_name": data["user_name"],
            "user_lastname": data["user_lastname"],
            "email": data["email"],
            "rol_id": role.id,
        }
        if data.get("password"):
            update["password"] = hash_password(data["password"])
        return self.user_repo.update(user, update)

    def _make_token(self, user) -> str:
        return create_access_token({
            "user_name": user.user_name,
            "user_lastname": user.user_lastname,
            "email": user.email,
            "rol": user.role.rol,
        })
