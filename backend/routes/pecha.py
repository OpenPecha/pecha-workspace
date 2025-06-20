from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from pecha_parser import pecha_parser, pecha_downloader


router = APIRouter(prefix="/pecha", tags=["pecha"])

class PechaRequest(BaseModel):
    pecha_id: str

class PechaResponse(BaseModel):
    pecha_id: str
    bases: Dict[str, str]
    layers: Dict[str, Any]
    metadata: Dict[str, Any]
    message: str


@router.get("/{pecha_id}/download")
async def download_pecha(pecha_id: str):
    """
    Download pecha zip file only (without parsing).
    Returns the path where the file was downloaded.
    Note: This endpoint does not clean up the downloaded file.
    """
    try:
        output_path = pecha_downloader(pecha_id)
        
        if output_path is None:
            raise HTTPException(status_code=404, detail=f"Pecha {pecha_id} not found or could not be downloaded")
        
        return {
            "pecha_id": pecha_id,
            "download_path": output_path,
            "message": f"Successfully downloaded pecha {pecha_id}"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error downloading pecha {pecha_id}: {str(e)}")

@router.get("/{pecha_id}/metadata")
async def get_pecha_metadata(pecha_id: str):
    """
    Get only the metadata of a pecha.
    Downloads, extracts, parses, and returns only the metadata.
    Automatically cleans up temporary files after processing.
    """
    try:
        # Parse the pecha
        pecha = pecha_parser(pecha_id)
        
        if pecha is None:
            raise HTTPException(status_code=404, detail=f"Pecha {pecha_id} not found or could not be downloaded")
        
        return {
            "pecha_id": pecha.id,
            "metadata": pecha.metadata,
            "message": f"Successfully retrieved metadata for pecha {pecha_id}"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving metadata for pecha {pecha_id}: {str(e)}")

@router.get("/{pecha_id}/bases")
async def get_pecha_bases(pecha_id: str):
    """
    Get only the bases of a pecha.
    Downloads, extracts, parses, and returns only the bases.
    Automatically cleans up temporary files after processing.
    """
    try:
        # Parse the pecha
        pecha = pecha_parser(pecha_id)
        
        if pecha is None:
            raise HTTPException(status_code=404, detail=f"Pecha {pecha_id} not found or could not be downloaded")
        
        return {
            "pecha_id": pecha.id,
            "bases": pecha.bases,
            "message": f"Successfully retrieved bases for pecha {pecha_id}"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving bases for pecha {pecha_id}: {str(e)}")
