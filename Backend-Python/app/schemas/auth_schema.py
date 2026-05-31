from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)


class RegisterRequest(BaseModel):
    user_name: str = Field(min_length=1)
    user_lastname: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=6)
