from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, Field


class UserCreateRequest(BaseModel):
    user_name: str = Field(min_length=1)
    user_lastname: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=6)
    rol: Literal["Usuario", "Administrador"]


class UserEditRequest(BaseModel):
    id: str
    user_name: str = Field(min_length=1)
    user_lastname: str = Field(min_length=1)
    email: EmailStr
    password: Optional[str] = Field(None, min_length=6)
    rol: Literal["Usuario", "Administrador"]
