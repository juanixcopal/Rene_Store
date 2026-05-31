from pydantic import BaseModel


class CategoryResponse(BaseModel):
    id: int
    product: str
    gender: str
