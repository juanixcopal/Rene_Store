from app.models.user_model import User
from app.models.product_model import Product
from app.models.category_model import Category


def fmt_category(cat: Category) -> dict:
    return {
        "_id": str(cat.id),
        "product": cat.product,
        "gender": cat.gender,
    }


def fmt_user(user: User) -> dict:
    return {
        "_id": str(user.id),
        "user_name": user.user_name,
        "user_lastname": user.user_lastname,
        "email": user.email,
        "rol": user.role.rol,
        "rol_id": {
            "_id": str(user.role.id),
            "rol": user.role.rol,
        },
        "createdAt": user.created_at.isoformat() if user.created_at else None,
        "updatedAt": user.updated_at.isoformat() if user.updated_at else None,
    }


def fmt_product(prod: Product) -> dict:
    return {
        "_id": str(prod.id),
        "name": prod.name,
        "description": prod.description,
        "price": prod.price,
        "stock": prod.stock,
        "image": prod.image,
        "category_id": fmt_category(prod.category) if prod.category else None,
        "isDeleted": prod.is_deleted,
        "createdAt": prod.created_at.isoformat() if prod.created_at else None,
        "updatedAt": prod.updated_at.isoformat() if prod.updated_at else None,
    }
