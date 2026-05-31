from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.connection import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    products = relationship("Product", back_populates="category")
