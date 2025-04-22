from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String)
    picture = Column(String)
    name = Column(String)
    role = Column(String)
    isAdmin = Column(Boolean, default=False)
    
class Tools(Base):
    __tablename__ = "tools"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    description = Column(String, nullable=True)
    category = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    image = Column(String, nullable=True)
    link = Column(String, nullable=True)
    demo = Column(String, nullable=True)
    icon =Column(String,nullable=True)
    
    