from fastapi import APIRouter, Depends, Security, HTTPException
from typing import Optional
import time
from utils import UnauthorizedException, VerifyToken
from database import db_dependency
from pydantic import BaseModel
import model 
class UserBase(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    picture: Optional[str] = None
    role: Optional[str] = None
    isAdmin: bool = False
    
router = APIRouter(
    prefix="/api/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)

auth = VerifyToken()

@router.get("/me", tags=["user"])
async def get_user_profile(auth_result: dict = Security(auth.verify)):
    """Get the authenticated user's profile information."""
    return {
            "id": auth_result.get("sub"),
            "email": auth_result.get("https://pecha-tool/email"),
            "picture": auth_result.get("https://pecha-tool/picture")
        }
    

@router.post("/create")
async def create_user(db: db_dependency, auth_result: dict = Security(auth.verify)):
    """Create a new user or return existing user."""
    user_id = auth_result.get("sub")
    user_email = auth_result.get("https://pecha-tool/email")
    user_picture = auth_result.get("https://pecha-tool/picture")
    
    # Check if user already exists
    existing_user = db.query(model.User).filter(model.User.id == user_id).first()
    if existing_user:
        return existing_user
    
    # Create new user
    db_user = model.User(
        id=user_id,
        email=user_email,
        picture=user_picture,
        name=user_email.split('@')[0] if user_email else None
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{user_id}", tags=["user"])
async def get_user(user_id: str, db: db_dependency, auth_result: dict = Security(auth.verify)):
    """Get a specific user by ID."""
    auth_user_id = auth_result.get("sub")
    auth_user = db.query(model.User).filter(model.User.id == auth_user_id).first()
    
    # Allow access only if requesting own profile or is admin
    if auth_user_id != user_id and (not auth_user or not auth_user.isAdmin):
        raise HTTPException(status_code=403, detail="Not authorized to access this user")
    
    user = db.query(model.User).filter(model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/", tags=["user"])
async def get_all_users(db: db_dependency, auth_result: dict = Security(auth.verify)):
    """Get all users (admin only)."""
    # Check if user is admin
    user_id = auth_result.get("sub")
    user = db.query(model.User).filter(model.User.id == user_id).first()
    if not user or not user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")
    
    users = db.query(model.User).all()
    return users

@router.patch("/", tags=["user"])
async def update_user(
    user_update: UserBase, 
    db: db_dependency, 
    auth_result: dict = Security(auth.verify)
):
    """Update user information."""
    # Get user ID from token
    user_id = auth_result.get("sub")
    
    db_user = db.query(model.User).filter(model.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{user_id}", tags=["user"])
async def delete_user(
    user_id: str, 
    db: db_dependency, 
    auth_result: dict = Security(auth.verify)
):
    """Delete a user (admin only)."""
    # Check if user is admin
    auth_user_id = auth_result.get("sub")
    auth_user = db.query(model.User).filter(model.User.id == auth_user_id).first()
    
    if not auth_user or not auth_user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to delete users")
    
    db_user = db.query(model.User).filter(model.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}
