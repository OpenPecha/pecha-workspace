from fastapi import FastAPI, Depends, HTTPException, status, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import RedirectResponse, JSONResponse
from jose import jwt, JWTError
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
import os
import time
import requests
import secrets
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", secrets.token_hex(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Okta Configuration
OKTA_ISSUER = os.getenv("OKTA_ISSUER", "")
OKTA_METADATA_URL = os.getenv("OKTA_METADATA_URL", "")
OKTA_SIGN_ON_URL = os.getenv("OKTA_SIGN_ON_URL", "")
OKTA_SIGN_OUT_URL = os.getenv("OKTA_SIGN_OUT_URL", "")
OKTA_CLIENT_ID = os.getenv("OKTA_CLIENT_ID", "")
OKTA_CLIENT_SECRET = os.getenv("OKTA_CLIENT_SECRET", "")
OKTA_REDIRECT_URI = os.getenv("OKTA_REDIRECT_URI", "http://localhost:8000/api/auth/callback")
OKTA_CERT_PATH = os.getenv("OKTA_CERT_PATH", "certs/okta.crt")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI(title="Pecha API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://trial-1570778.okta.com",  # Add Okta domain
        FRONTEND_URL,  # Add the frontend URL from env
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Expose all headers for redirects
)

# OAuth2 scheme for token validation
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

# Models
class Token(BaseModel):
    access_token: str
    token_type: str
    expires_at: int

class TokenData(BaseModel):
    sub: Optional[str] = None
    email: Optional[str] = None

class User(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    picture: Optional[str] = None
    is_active: bool = True

class UserInDB(User):
    hashed_password: Optional[str] = None

# In-memory user database (replace with a real database in production)
users_db: Dict[str, Dict[str, Any]] = {}

# In-memory token blacklist (replace with Redis or database in production)
token_blacklist: set = set()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(tz=timezone.utc) + expires_delta
    else:
        expire = datetime.now(tz=timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt, int(expire.timestamp())

async def get_current_user(token: str = Depends(oauth2_scheme)) -> Optional[User]:
    if not token:
        return None
    
    # Check if token is blacklisted
    if token in token_blacklist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Extract user information
        sub = payload.get("sub")
        if sub is None:
            raise credentials_exception
            
        token_data = TokenData(sub=sub, email=payload.get("email"))
        
        # Get user from database
        user_dict = users_db.get(token_data.sub)
        if user_dict is None:
            raise credentials_exception
            
        user = User(**user_dict)
        return user
        
    except JWTError:
        raise credentials_exception

# Okta SSO routes
@app.get("/api/auth/login")
async def login_okta(redirect_url: Optional[str] = None):
    # Use the Sign-On URL from Okta
    auth_url = OKTA_SIGN_ON_URL
    
    # Store the custom redirect URL in the session or state parameter
    state = ""
    if redirect_url:
        # Encode the redirect URL in a state parameter for security
        state = secrets.token_urlsafe(16) + "__" + redirect_url
    
    # For SAML, we typically don't need to add these parameters as they're configured in Okta
    # But we'll still add state for security and redirect tracking
    params = {
        "RelayState": state if state else secrets.token_urlsafe(16)
    }
    
    # Build the URL with parameters
    url_params = "&".join([f"{k}={v}" for k, v in params.items()])
    auth_url = f"{auth_url}?{url_params}"
    
    # Redirect directly to Okta instead of returning the URL
     # Check if this is an AJAX request (from the frontend fetch)
    is_ajax = request.headers.get("X-Requested-With") == "XMLHttpRequest" or \
              request.headers.get("Accept") == "application/json"
    
    if is_ajax:
        return {"auth_url": auth_url}
    else:
        # Direct browser request, so redirect
        return RedirectResponse(url=auth_url)

def decode_saml_response(saml_response: str) -> str:
    """Decode the base64 SAML response to a string"""
    import base64
    return base64.b64decode(saml_response).decode('utf-8')

def check_certificate_path() -> str:
    """Check if the certificate file exists and return its path"""
    import os.path
    cert_path = os.path.join(os.path.dirname(__file__), OKTA_CERT_PATH)
    if not os.path.exists(cert_path):
        print(f"Warning: Certificate file not found at {cert_path}")
        print("SAML signature validation will be skipped. This is insecure in production!")
    return cert_path

def extract_user_from_saml(root, namespaces: dict) -> tuple:
    """Extract user information from SAML assertion"""
    # Find the assertion
    assertion = root.find('.//saml2:Assertion', namespaces)
    if assertion is None:
        raise ValueError("SAML Assertion not found")
        
    # Find the subject
    subject = assertion.find('.//saml2:Subject', namespaces)
    if subject is None:
        raise ValueError("Subject not found in SAML Assertion")
        
    # Get the NameID which typically contains the user identifier
    name_id = subject.find('.//saml2:NameID', namespaces)
    if name_id is None:
        raise ValueError("NameID not found in Subject")
        
    user_id = name_id.text
    
    # Extract attributes (email, etc.)
    email = None
    
    attribute_statement = assertion.find('.//saml2:AttributeStatement', namespaces)
    if attribute_statement is not None:
        for attribute in attribute_statement.findall('.//saml2:Attribute', namespaces):
            attr_name = attribute.get('Name')
            attr_value_element = attribute.find('.//saml2:AttributeValue', namespaces)
            
            if attr_value_element is not None and attr_value_element.text:
                if attr_name == 'email':
                    email = attr_value_element.text
    
    # If email wasn't found, use the NameID as a fallback
    if not email and '@' in user_id:
        email = user_id
        
    return user_id, email

def get_redirect_url(relay_state: Optional[str]) -> str:
    """Get the redirect URL from relay state or use default"""
    redirect_url = f"{FRONTEND_URL}/callback"
    
    # Check if we have a custom redirect URL in the state
    if relay_state and "__" in relay_state:
        _, custom_redirect = relay_state.split("__", 1)
        redirect_url = custom_redirect
        
    return redirect_url

def build_redirect_url(base_url: str, params: dict) -> str:
    """Build a redirect URL with query parameters"""
    query_params = "&".join([f"{k}={v}" for k, v in params.items()])
    return f"{base_url}?{query_params}"

def process_saml_response(saml_response: str):
    """Process the SAML response and extract user information"""
    import xml.etree.ElementTree as ET
    
    # Check certificate path - we'll use this later for SAML validation
    check_certificate_path()
    
    # Decode the SAML response
    decoded_response = decode_saml_response(saml_response)
    
    # Parse the XML
    root = ET.fromstring(decoded_response)
    
    # Define namespaces for XML parsing
    namespaces = {
        'saml2': 'urn:oasis:names:tc:SAML:2.0:assertion',
        'saml2p': 'urn:oasis:names:tc:SAML:2.0:protocol'
    }
    
    # Extract user information from SAML assertion
    user_id, email = extract_user_from_saml(root, namespaces)
    
    if not user_id or not email:
        raise ValueError("Invalid user information from Okta SAML response")
        
    return user_id, email

@app.get("/api/auth/callback")
async def okta_callback(request: Request, relay_state: Optional[str] = None, saml_response: Optional[str] = None):
    # For SAML, we receive a saml_response instead of a code
    if not saml_response:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing SAML response",
        )
    
    try:
        # Process the SAML response and extract user information
        user_id, email = process_saml_response(saml_response)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error parsing SAML response: {str(e)}",
        )
    except Exception as e:
        # Log the error for debugging
        print(f"Error processing SAML response: {str(e)}")
        
        # Get redirect URL (default or from relay state)
        redirect_url = get_redirect_url(relay_state)
        
        # Build error redirect URL
        error_redirect = build_redirect_url(redirect_url, {"error": str(e)})
        return RedirectResponse(url=error_redirect)
    
    # Create user and generate token
    return handle_successful_auth(user_id, email, relay_state)

def handle_successful_auth(user_id: str, email: str, relay_state: Optional[str] = None) -> RedirectResponse:
    """Handle successful authentication by creating user, generating token and redirecting"""
    # Store user in our database
    user_data = {
        "id": user_id,
        "email": email,
        "is_active": True,
    }
    
    users_db[user_id] = user_data
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token, expires_at = create_access_token(
        data={"sub": user_id, "email": email},
        expires_delta=access_token_expires,
    )
    
    # Get redirect URL (default or from relay state)
    redirect_url = get_redirect_url(relay_state)
    
    # Add token and user information to the redirect URL
    params = {
        "token": access_token,
        "expires_at": expires_at,
    }
    
    if email:
        params["email"] = email
    
    # Build the redirect URL with parameters
    redirect_with_token = build_redirect_url(redirect_url, params)
    
    return RedirectResponse(url=redirect_with_token)

# Token endpoint for validating and refreshing tokens
@app.post("/api/auth/token", response_model=Token)
async def get_token(request: Request):
    form_data = await request.json()
    token = form_data.get("token")
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token is required",
        )
    
    try:
        # Verify the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        
        if not user_id or user_id not in users_db:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )
        
        # Check if token is expired
        exp = payload.get("exp")
        if not exp or datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(tz=timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
            )
        
        return {
            "access_token": token,
            "token_type": "bearer",
            "expires_at": exp,
        }
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

# Logout endpoint
@app.get("/api/auth/logout")
async def logout(request: Request, redirect_url: Optional[str] = None):
    # Extract token from Authorization header if present
    authorization = request.headers.get("Authorization")
    if authorization and authorization.startswith("Bearer "):
        token = authorization.replace("Bearer ", "")
        # Add token to blacklist
        token_blacklist.add(token)
        print(f"Token added to blacklist. Blacklist size: {len(token_blacklist)}")
    
    # Redirect to Okta's logout URL
    logout_url = OKTA_SIGN_OUT_URL
    
    # Add redirect URL if provided
    if redirect_url:
        # Some SAML providers accept a redirect parameter
        logout_url = f"{logout_url}?redirect_uri={redirect_url}"
        return RedirectResponse(url=logout_url)
    
    # Otherwise return a success message
    return {"message": "Successfully logged out", "logout_url": logout_url}


# Endpoint to verify Okta tokens from frontend
class OktaVerifyRequest(BaseModel):
    token: str
    user_info: dict

@app.post("/api/auth/verify")
async def verify_okta_token(request: OktaVerifyRequest):
    try:
        # Verify the token with Okta (in a production app, you would validate the token)
        # For simplicity, we'll trust the token and user info sent from the frontend
        
        # Extract user info
        user_info = request.user_info
        user_id = user_info.get("sub")
        email = user_info.get("email")
        name = user_info.get("name", user_info.get("preferred_username"))
        picture = user_info.get("picture")
        
        if not user_id or not email:
            raise HTTPException(status_code=400, detail="Invalid user information")
        
        # Store user in our database
        user_data = {
            "id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "is_active": True,
        }
        
        users_db[user_id] = user_data
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token, expires_at = create_access_token(
            data={"sub": user_id, "email": email},
            expires_delta=access_token_expires,
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_at": expires_at,
            "user": user_data
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to verify Google token: {str(e)}")

# API Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the Pecha API"}

@app.get("/api/public")
def public_route():
    return {"message": "This is a public endpoint"}

@app.get("/api/private")
async def private_route(user: User = Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return {"message": "This is a private endpoint", "user": user}

@app.get("/api/user")
async def get_user(user: User = Depends(get_current_user)):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
