from sqlalchemy.orm import Session
from app.repositories.category_repository import CategoryRepository


class CategoryService:
    def __init__(self, db: Session):
        self.repo = CategoryRepository(db)

    def get_all(self):
        return self.repo.find_all()
