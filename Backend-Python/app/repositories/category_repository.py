from sqlalchemy.orm import Session
from app.models.category_model import Category


class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_all(self) -> list[Category]:
        return self.db.query(Category).all()

    def find_by_id(self, category_id: int) -> Category | None:
        return self.db.query(Category).filter(Category.id == category_id).first()
