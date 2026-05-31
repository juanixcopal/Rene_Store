from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services.category_service import CategoryService
from app.core.dependencies import get_current_user
from app.helpers import fmt_category

router = APIRouter(prefix="/api/category", tags=["Categorías"])


@router.get("/query")
def get_categories(
    service: str = Header(...),
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return [fmt_category(c) for c in CategoryService(db).get_all()]
