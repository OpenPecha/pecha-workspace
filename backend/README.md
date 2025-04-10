# Pecha API Backend

This is a FastAPI backend for the Pecha application with Auth0 integration.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the server:
   ```
   uvicorn main:app --reload --port 8000
   ```

## API Endpoints

- `/` - Welcome message
- `/api/public` - Public endpoint (no authentication required)
- `/api/private` - Private endpoint (requires authentication)
- `/api/user` - Returns the authenticated user's information

## Authentication

This API uses Auth0 for authentication. It validates JWT tokens from the frontend and extracts user information.

## Environment Variables

Create a `.env` file with the following variables:

```
AUTH0_DOMAIN=your-auth0-domain
AUTH0_API_AUDIENCE=your-auth0-api-audience
```
