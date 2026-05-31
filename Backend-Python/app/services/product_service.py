import os
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.repositories.product_repository import ProductRepository
from app.repositories.category_repository import CategoryRepository
from app.core.config import UPLOAD_DIR, SERVER_URL
from app.core.exceptions import NotFoundError


class ProductService:
    def __init__(self, db: Session):
        self.product_repo = ProductRepository(db)
        self.category_repo = CategoryRepository(db)

    def get_all(self):
        return self.product_repo.find_all()

    def get_by_id(self, product_id: int):
        product = self.product_repo.find_by_id(product_id)
        if not product:
            raise NotFoundError("Producto no encontrado")
        return product

    def get_by_gender_and_category(self, gender: str, category_id: int):
        return self.product_repo.find_by_gender_and_category(gender, category_id)

    async def create(self, data: dict, image: UploadFile):
        category = self.category_repo.find_by_id(int(data["category_id"]))
        if not category:
            raise NotFoundError("Categoría no encontrada")
        return self.product_repo.create({
            "name": data["name"],
            "description": data["description"],
            "price": float(data["price"]),
            "stock": int(data["stock"]),
            "category_id": category.id,
            "image": await self._save_image(image),
        })

    async def edit(self, product_id: int, data: dict, image: UploadFile | None):
        product = self.product_repo.find_by_id(product_id)
        if not product:
            raise NotFoundError("Producto no encontrado")
        category = self.category_repo.find_by_id(int(data["category_id"]))
        if not category:
            raise NotFoundError("Categoría no encontrada")
        update = {
            "name": data["name"],
            "description": data["description"],
            "price": float(data["price"]),
            "stock": int(data["stock"]),
            "category_id": category.id,
        }
        if image:
            update["image"] = await self._save_image(image)
        return self.product_repo.update(product, update)

    def delete(self, product_id: int) -> None:
        product = self.product_repo.find_by_id(product_id)
        if not product:
            raise NotFoundError("Producto no encontrado")
        self.product_repo.soft_delete(product)

    async def _save_image(self, image: UploadFile) -> str:
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        ext = os.path.splitext(image.filename)[1] if image.filename else ".jpg"
        filename = f"{uuid.uuid4()}{ext}"
        content = await image.read()
        with open(os.path.join(UPLOAD_DIR, filename), "wb") as f:
            f.write(content)
        return f"{SERVER_URL}/static/uploads/{filename}"
