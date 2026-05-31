from typing import Optional
from fastapi import APIRouter, Depends, Header, Form, File, UploadFile
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services.product_service import ProductService
from app.core.dependencies import get_current_user, require_admin
from app.helpers import fmt_product

router = APIRouter(prefix="/api/product", tags=["Productos"])


@router.get("/query")
def get_products(
    service: str = Header(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [fmt_product(p) for p in ProductService(db).get_all()]


@router.get("/query/{gender}/{category_id}")
def get_products_filtered(
    gender: str,
    category_id: str,
    service: str = Header(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    products = ProductService(db).get_by_gender_and_category(gender, int(category_id))
    return [fmt_product(p) for p in products]


@router.get("/query/{product_id}")
def get_product(
    product_id: str,
    service: str = Header(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return fmt_product(ProductService(db).get_by_id(int(product_id)))


@router.post("/manager")
async def create_product(
    service: str = Header(...),
    name: str = Form(..., min_length=1),
    description: str = Form(..., min_length=1),
    price: float = Form(..., gt=0),
    stock: int = Form(..., ge=0),
    category_id: str = Form(...),
    image: UploadFile = File(...),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    data = {"name": name, "description": description, "price": price,
            "stock": stock, "category_id": category_id}
    product = await ProductService(db).create(data, image)
    return {**fmt_product(product), "message": "Producto creado exitosamente"}


@router.put("/manager/{product_id}")
async def edit_product(
    product_id: str,
    service: str = Header(...),
    name: str = Form(..., min_length=1),
    description: str = Form(..., min_length=1),
    price: float = Form(..., gt=0),
    stock: int = Form(..., ge=0),
    category_id: str = Form(...),
    image: Optional[UploadFile] = File(None),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    data = {"name": name, "description": description, "price": price,
            "stock": stock, "category_id": category_id}
    img = image if (image and image.filename) else None
    product = await ProductService(db).edit(int(product_id), data, img)
    return {**fmt_product(product), "message": "Producto actualizado exitosamente"}


@router.delete("/manager/{product_id}")
def delete_product(
    product_id: str,
    service: str = Header(...),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    ProductService(db).delete(int(product_id))
    return {"message": "Producto eliminado", "deletedId": product_id}
