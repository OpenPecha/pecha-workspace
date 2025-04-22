from fastapi import FastAPI, Security ,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
import os
import secrets
from dotenv import load_dotenv
from utils import UnauthorizedException, VerifyToken
from config import get_settings
import requests
import time
import models
from routes import user,tools
# Load environment variables
load_dotenv()
from database import engine, SessionLocal

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", secrets.token_hex(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Auth0 Configuration
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN", "dev-vz6o17motc18g45h.us.auth0.com")
AUTH0_CLIENT_ID = os.getenv("AUTH0_CLIENT_ID", "kuIntldrGYaj1BeONppc9zMUbBe2PCSf")
AUTH0_CLIENT_SECRET = os.getenv("AUTH0_CLIENT_SECRET", "")
AUTH0_AUDIENCE = os.getenv("AUTH0_AUDIENCE", f"https://{AUTH0_DOMAIN}/api/v2/")
AUTH0_REDIRECT_URI = os.getenv("AUTH0_REDIRECT_URI", "http://localhost:8000/api/auth/callback")
AUTH0_ALGORITHMS = ["RS256"]

app = FastAPI(
    title="Pecha API",
    description="API for Pecha project with Auth0 authentication",
    version="1.0.0",
    docs_url=None,  # Disable default Swagger UI
    redoc_url=None  # Disable default ReDoc UI
)
models.Base.metadata.create_all(engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://trial-1570778.okta.com",  # Add Okta domain
        f"https://{AUTH0_DOMAIN}",  # Add Auth0 domain
        FRONTEND_URL,  # Add the frontend URL from env
        "http://localhost:8000",  # Add backend URL for Swagger UI
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Expose all headers for redirects
)

settings = get_settings()
# Root endpoint
@app.get("/", tags=["root"])
async def read_root():
    """
    Root endpoint that returns a welcome message.
    """
    return {
        "message": "Welcome to Pecha API",
        "documentation": "/docs",
        "version": app.version
    }
    

@app.post("/api/auth/token", tags=["auth"])
async def get_token():
    """
    Get an OAuth access token from Auth0 using client credentials grant.
    """
    payload = {
        'grant_type': 'client_credentials',
        'client_id': settings.AUTH0_CLIENT_ID,
        'client_secret': settings.AUTH0_CLIENT_SECRET,
        'audience': settings.AUTH0_AUDIENCE
    }


    response = requests.post(
        f'https://{settings.AUTH0_DOMAIN}/oauth/token',
        data=payload
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    return response.json()


# Include routes
app.include_router(user.router)
app.include_router(tools.router)

# Custom Swagger UI endpoint
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    """
    Custom Swagger UI endpoint.
    """
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title=app.title,
        swagger_js_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
    )

# OpenAPI endpoint
@app.get("/openapi.json", include_in_schema=False)
async def get_openapi_endpoint():
    """
    Return the OpenAPI schema.
    """



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
