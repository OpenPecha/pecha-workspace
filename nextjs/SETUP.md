# Pecha Tools Setup Guide

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the `nextjs` directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Auth0 Configuration (Required)
AUTH0_SECRET='use-a-long-random-value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'
AUTH0_AUDIENCE='your-auth0-audience'

# Umami Analytics (Optional)
NEXT_PUBLIC_UMAMI_WEBSITE_ID='your-umami-website-id'
NEXT_PUBLIC_UMAMI_SRC='https://your-umami-instance.com/script.js'
```

### 2. Auth0 Configuration

1. **Create Auth0 Application**:
   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new "Regular Web Application"
2. **Configure Application Settings**:

   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

3. **Configure API**:

   - Create an API in Auth0 with identifier (this becomes your `AUTH0_AUDIENCE`)
   - Enable RBAC if you need role-based permissions

4. **Copy Credentials**:
   - Domain → `AUTH0_ISSUER_BASE_URL` (add https://)
   - Client ID → `AUTH0_CLIENT_ID`
   - Client Secret → `AUTH0_CLIENT_SECRET`
   - API Identifier → `AUTH0_AUDIENCE`

### 3. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

## Features Enabled

### ✅ Authentication

- **Login/Logout**: Users can sign in with Auth0
- **Protected Routes**: `/profile` and `/admin` require authentication
- **API Protection**: User and admin API endpoints require valid sessions
- **User Context**: User information available throughout the app

### ✅ Analytics

- **Umami Integration**: Automatic page view tracking
- **User Identification**: Users are tracked with their Auth0 ID
- **Custom Events**: Tool clicks and interactions are tracked
- **Privacy-Focused**: No cookies, respects user privacy

### ✅ Database

- **Prisma ORM**: Type-safe database operations
- **User Storage**: Auth0 users are created in local database
- **Tool Management**: Full CRUD operations for tools
- **Admin Controls**: User role management

## Testing the Setup

1. **Start the app**: `npm run dev`
2. **Visit**: `http://localhost:3000`
3. **Test Authentication**:
   - Click "Sign in" button
   - Should redirect to Auth0 login
   - After login, should redirect back with user info
4. **Test Protected Routes**:
   - Visit `/profile` - should redirect to login if not authenticated
   - After login, should show user profile
5. **Test API**:
   - Tools should load on homepage (from `/api/tools`)
   - User creation happens automatically on first login

## Troubleshooting

### Authentication Issues

- Check `.env.local` has all AUTH0\_ variables
- Verify Auth0 application URLs match exactly
- Check browser console for detailed error messages

### Database Issues

- Ensure PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql://user:pass@host:port/db`
- Run `npm run db:push` to sync schema

### Analytics Issues

- Umami is optional - app works without it
- Check `NEXT_PUBLIC_UMAMI_*` variables are correctly set
- Verify Umami script URL is accessible

### API Issues

- Check browser Network tab for API call failures
- Verify authentication tokens in request headers
- Check server console for detailed error logs

## Production Deployment

1. **Environment Variables**:

   - Update `AUTH0_BASE_URL` to your production domain
   - Update Auth0 application URLs to production URLs
   - Ensure `AUTH0_SECRET` is a secure random string

2. **Database**:

   - Use production PostgreSQL instance
   - Run migrations: `npm run db:push`

3. **Deploy to Vercel/Railway/etc**:
   - Push to Git repository
   - Connect to deployment platform
   - Configure environment variables in platform

The application is now fully configured with working authentication and analytics!
