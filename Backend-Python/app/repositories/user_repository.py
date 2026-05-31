from sqlalchemy.orm import Session, joinedload
from app.models.user_model import User
from app.models.role_model import Role


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_by_email(self, email: str) -> User | None:
        return (
            self.db.query(User)
            .options(joinedload(User.role))
            .filter(User.email == email)
            .first()
        )

    def find_by_id(self, user_id: int) -> User | None:
        return (
            self.db.query(User)
            .options(joinedload(User.role))
            .filter(User.id == user_id)
            .first()
        )

    def find_all_by_role(self, role_name: str) -> list[User]:
        return (
            self.db.query(User)
            .options(joinedload(User.role))
            .join(Role)
            .filter(Role.rol == role_name)
            .all()
        )

    def create(self, data: dict) -> User:
        user = User(**data)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return self.find_by_id(user.id)

    def update(self, user: User, data: dict) -> User:
        for key, value in data.items():
            setattr(user, key, value)
        self.db.commit()
        self.db.refresh(user)
        return self.find_by_id(user.id)


class RoleRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_by_name(self, name: str) -> Role | None:
        return self.db.query(Role).filter(Role.rol == name).first()
