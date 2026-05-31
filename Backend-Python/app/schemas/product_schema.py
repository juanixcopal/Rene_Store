from typing import Optional
from pydantic import BaseModel, Field


class ProductCreateForm(BaseModel):
    name: str = Field(min_length=1)
    description: str = Field(min_length=1)
    price: float = Field(gt=0)
    stock: int = Field(ge=0)
    category_id: str = Field(min_length=1)


class ProductEditForm(BaseModel):
    name: str = Field(min_length=1)
    description: str = Field(min_length=1)
    price: float = Field(gt=0)
    stock: int = Field(ge=0)
    category_id: str = Field(min_length=1)
