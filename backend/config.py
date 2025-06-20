from pydantic_settings import BaseSettings

from functools import lru_cache
import json

class Settings(BaseSettings):
    AUTH0_DOMAIN: str
    AUTH0_AUDIENCE: str
    AUTH0_CLIENT_ID: str
    AUTH0_CLIENT_SECRET: str
    AUTH0_ALGORITHMS: str
    JWT_SECRET_KEY:str
    FRONTEND_URL:str
    DATABASE_URL:str
    ALLOWED_ORIGINS: str = ""
    OPENPECHA_API_URL: str 
    
    @property
    def auth0_domain(self):
        return self.AUTH0_DOMAIN
        
    @property
    def auth0_api_audience(self):
        return self.AUTH0_AUDIENCE
        
    @property
    def auth0_issuer(self):
        return f"https://{self.AUTH0_DOMAIN}/"
        
    @property
    def auth0_algorithms(self):
        return json.loads(self.AUTH0_ALGORITHMS)

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()