from fastapi import APIRouter, Depends, Security, HTTPException
from typing import Optional, List
from utils import UnauthorizedException, VerifyToken
from database import db_dependency
from pydantic import BaseModel
import models
from datetime import datetime
import json

class ToolBase(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    link: Optional[str] = None
    demo: Optional[str] = None
    icon: Optional[str] = None

class ToolAnalytics(BaseModel):
    tool_id: str
    tool_name: str
    event_type: str  # "clicked", "accessed", "viewed"
    user_id: Optional[str] = None
    user_role: Optional[str] = None
    access_type: Optional[str] = None  # "click", "redirect", "direct"
    referrer_page: Optional[str] = None
    metadata: Optional[dict] = None

router = APIRouter(
    prefix="/api/tools",
    tags=["tools"],
    responses={404: {"description": "Not found"}},
)

auth = VerifyToken()

@router.get("/", tags=["tools"])
async def get_all_tools(db: db_dependency):
    """Get all available tools."""
    tools = db.query(models.Tools).all()
    return tools

@router.get("/{tool_id}", tags=["tools"])
async def get_tool(tool_id: str, db: db_dependency, auth_result: dict = Security(auth.verify)):
    """Get a specific tool by ID."""
    tool = db.query(models.Tools).filter(models.Tools.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return tool

@router.post("/", tags=["tools"])
async def create_tool(
    tool: ToolBase, 
    db: db_dependency, 
    auth_result: dict = Security(auth.verify)
):
    """Create a new tool (admin only)."""
    # Check if user is admin
    user_id = auth_result.get("sub")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user or not user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to create tools")
    
    db_tool = models.Tools(
        id=tool.id,
        name=tool.name,
        description=tool.description,
        category=tool.category,
        price=tool.price,
        link=tool.link,
        demo=tool.demo,
        icon=tool.icon
    )
    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)
    return db_tool

@router.patch("/{tool_id}", tags=["tools"])
async def update_tool(
    tool_id: str,
    tool_update: ToolBase, 
    db: db_dependency, 
    auth_result: dict = Security(auth.verify)
):
    """Update tool information (admin only)."""
    # Check if user is admin
    user_id = auth_result.get("sub")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user or not user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to update tools")
    
    db_tool = db.query(models.Tools).filter(models.Tools.id == tool_id).first()
    if not db_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    
    for key, value in tool_update.dict(exclude_unset=True).items():
        setattr(db_tool, key, value)
    
    db.commit()
    db.refresh(db_tool)
    return db_tool

@router.delete("/{tool_id}", tags=["tools"])
async def delete_tool(
    tool_id: str, 
    db: db_dependency, 
    auth_result: dict = Security(auth.verify)
):
    """Delete a tool (admin only)."""
    # Check if user is admin
    user_id = auth_result.get("sub")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user or not user.isAdmin:
        raise HTTPException(status_code=403, detail="Not authorized to delete tools")
    
    db_tool = db.query(models.Tools).filter(models.Tools.id == tool_id).first()
    if not db_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    
    db.delete(db_tool)
    db.commit()
    return {"message": "Tool deleted successfully"}

@router.post("/analytics", tags=["tools"])
async def track_tool_usage(
    analytics: ToolAnalytics,
    db: db_dependency,
    auth_result: dict = Security(auth.verify)
):
    """Track tool usage analytics."""
    try:
        # Log analytics data (you can store this in a database table if needed)
        analytics_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "tool_id": analytics.tool_id,
            "tool_name": analytics.tool_name,
            "event_type": analytics.event_type,
            "user_id": analytics.user_id or auth_result.get("sub"),
            "user_role": analytics.user_role,
            "access_type": analytics.access_type,
            "referrer_page": analytics.referrer_page,
            "metadata": analytics.metadata or {}
        }
        
        # Log to console/file (you can extend this to store in database)
        print(f"[TOOL_ANALYTICS] {json.dumps(analytics_data, indent=2)}")
        
        # Optional: Store in database
        # You can create a ToolAnalytics model and store this data
        
        return {
            "message": "Analytics tracked successfully",
            "data": analytics_data
        }
        
    except Exception as e:
        print(f"Error tracking analytics: {str(e)}")
        return {"message": "Analytics tracking failed", "error": str(e)}
