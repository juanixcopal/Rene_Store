from sqlalchemy.orm import Session, joinedload
from app.models.product_model import Product
from app.models.category_model import Category


class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def _with_category(self):
        return self.db.query(Product).options(joinedload(Product.category))

    def find_all(self) -> list[Product]:
        return self._with_category().filter(Product.is_deleted == False).all()

    def find_by_id(self, product_id: int) -> Product | None:
        return self._with_category().filter(Product.id == product_id).first()

    def find_by_gender_and_category(self, gender: str, category_id: int) -> list[Product]:
        return (
            self._with_category()
            .join(Category)
            .filter(
                Category.gender == gender,
                Product.category_id == category_id,
                Product.is_deleted == False,
            )
            .all()
        )

    def create(self, data: dict) -> Product:
        product = Product(**data)
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return self.find_by_id(product.id)

    def update(self, product: Product, data: dict) -> Product:
        for key, value in data.items():
            setattr(product, key, value)
        self.db.commit()
        self.db.refresh(product)
        return self.find_by_id(product.id)

    def soft_delete(self, product: Product) -> None:
        product.is_deleted = True
        self.db.commit()
