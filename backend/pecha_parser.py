import requests
import os
import zipfile
import shutil
from pathlib import Path
import json
from openpecha.pecha import Pecha
from config import get_settings

settings = get_settings()
backend_url = settings.OPENPECHA_API_URL

class FixedPecha(Pecha):
    def load_metadata(self):
        with open(self.metadata_path, encoding="utf-8") as f:
            return json.load(f)

def unzip_pecha(output_path):
    zip_path = Path(output_path)
    extract_dir = zip_path.with_suffix('')  # Removes `.zip`
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    return extract_dir

def cleanup_files(zip_path, extract_dir):
    """
    Clean up both the zip file and extracted directory.
    
    Args:
        zip_path (str): Path to the zip file
        extract_dir (Path): Path to the extracted directory
    """
    try:
        # Remove the zip file
        if os.path.exists(zip_path):
            os.remove(zip_path)
            print(f"Deleted zip file: {zip_path}")
        
        # Remove the extracted directory
        if extract_dir.exists():
            shutil.rmtree(extract_dir)
            print(f"Deleted extracted directory: {extract_dir}")
            
    except Exception as e:
        print(f"Error during cleanup: {e}")

def pecha_downloader(pecha_id):
    """
    Download a pecha zip file and save it to the output folder with pecha_id as filename.
    
    Args:
        pecha_id (str): The ID of the pecha to download
        
    Returns:
        str: Path to the downloaded file
    """
    url = f"{backend_url}/pecha/{pecha_id}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Create output folder if it doesn't exist
        output_folder = "output"
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
        
        # Save the zip file with pecha_id as filename
        output_path = os.path.join(output_folder, f"{pecha_id}.zip")
        
        with open(output_path, 'wb') as f:
            f.write(response.content)
        
        print(f"Successfully downloaded {pecha_id}.zip to {output_path}")
        return output_path
        
    except requests.exceptions.RequestException as e:
        print(f"Error downloading pecha {pecha_id}: {e}")
        return None
    
def pecha_parser(pecha_id):
    output_path = pecha_downloader(pecha_id)
    if output_path is None:
        return None
    
    zip_path = unzip_pecha(output_path)
    pecha = FixedPecha.from_path(zip_path)
    
    # Clean up files after getting the pecha data
    cleanup_files(output_path, zip_path)
    
    return pecha 