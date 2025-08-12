# Pecha Tools - Next.js Application

A modern Next.js application for Buddhist manuscript tools with integrated backend API routes and Prisma database.

## Features

- ✅ **Complete API Integration**: All backend API routes ported to Next.js API routes
- ✅ **Frontend Components**: All frontend pages and components copied and adapted
- ✅ **Prisma Database**: Database schema generated based on existing models
- ✅ **Auth0 Authentication**: Integrated authentication system
- ✅ **Modern UI**: Tailwind CSS with custom design system
- ✅ **TypeScript**: Full type safety throughout the application

## Project Structure

```
nextjs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes (ported from backend)
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── tools/         # Tools management API
│   │   │   ├── user/          # User management API
│   │   │   └── pecha/         # Pecha parsing API
│   │   ├── login/             # Login page
│   │   ├── logout/            # Logout page
│   │   ├── profile/           # User profile page
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # UI components (shadcn/ui style)
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Footer component
│   │   ├── Hero.tsx           # Hero section
│   │   ├── Layout.tsx         # Layout wrapper
│   │   ├── ToolsSection.tsx   # Tools display section
│   │   └── VisionSection.tsx  # Mission/vision section
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils.ts           # General utilities
│   └── api/                   # API client functions
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## API Routes

All backend API routes have been ported to Next.js:

### Authentication

- `GET /api/auth/token` - Get Auth0 token
- Auth0 built-in routes: `/api/auth/login`, `/api/auth/logout`, `/api/auth/callback`

### Tools Management

- `GET /api/tools` - Get all tools
- `POST /api/tools` - Create new tool (admin only)
- `GET /api/tools/[toolId]` - Get specific tool
- `PATCH /api/tools/[toolId]` - Update tool (admin only)
- `DELETE /api/tools/[toolId]` - Delete tool (admin only)
- `POST /api/tools/analytics` - Track tool usage

### User Management

- `GET /api/user/me` - Get current user profile
- `POST /api/user/create` - Create/get user account
- `GET /api/user` - Get all users with pagination (admin only)
- `PATCH /api/user` - Update current user
- `GET /api/user/[userId]` - Get specific user
- `DELETE /api/user/[userId]` - Delete user (admin only)
- `PATCH /api/user/[userId]/admin` - Update admin status (admin only)

### Pecha Processing

- `GET /api/pecha/[pechaId]/download` - Download pecha
- `GET /api/pecha/[pechaId]/metadata` - Get pecha metadata
- `GET /api/pecha/[pechaId]/bases` - Get pecha bases

## Database Schema

The Prisma schema includes:

```prisma
model User {
  id      String  @id
  email   String?
  picture String?
  name    String?
  role    String?
  isAdmin Boolean @default(false)
  @@map("users")
}

model Tools {
  id          String  @id @default(uuid())
  name        String?
  description String?
  category    String?
  price       Float?
  icon        String?
  link        String?
  demo        String?
  @@map("tools")
}
```

## Environment Variables

Create a `.env.local` file with:

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

### Auth0 Setup

1. Create an Auth0 account and application
2. Set your allowed callback URLs to: `http://localhost:3000/api/auth/callback`
3. Set your allowed logout URLs to: `http://localhost:3000`
4. Set your allowed web origins to: `http://localhost:3000`
5. Copy the Domain, Client ID, and Client Secret to your `.env.local`

### Umami Analytics Setup (Optional)

1. Set up Umami analytics instance
2. Create a website in Umami
3. Copy the Website ID and script URL to your `.env.local`

## Setup Instructions

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Setup Database**:

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

3. **Configure Environment**:

   - Copy `.env.example` to `.env.local`
   - Fill in your database and Auth0 credentials

4. **Run Development Server**:

   ```bash
   npm run dev
   ```

5. **Open Application**:
   Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## Features Implemented

### ✅ Backend API Routes

- All FastAPI endpoints converted to Next.js API routes
- JWT authentication with Auth0
- Database operations with Prisma
- Error handling and validation

### ✅ Frontend Components

- Hero section with typewriter animation
- Tools display with real-time data
- Vision/mission section
- Responsive navigation
- User authentication UI
- Profile management
- Admin dashboard (planned)

### ✅ Authentication System

- Auth0 integration for SSO
- Protected routes and API endpoints
- User profile management
- Admin role management

### ✅ Database Integration

- Prisma ORM setup
- PostgreSQL compatibility
- Schema migrations
- Type-safe database queries

### ✅ Modern UI/UX

- Tailwind CSS styling
- Responsive design
- Custom color scheme matching brand
- Smooth animations and transitions
- shadcn/ui component library

## Migration Notes

This Next.js application contains:

1. **Complete API Compatibility**: All backend endpoints are available at the same paths
2. **Database Schema**: Prisma schema matches the original SQLAlchemy models
3. **Frontend Parity**: All React components and pages have been ported
4. **Authentication**: Auth0 integration replaces custom JWT implementation
5. **Modern Stack**: Uses latest Next.js 15, React 19, and TypeScript

## Next Steps

1. Configure your database connection
2. Set up Auth0 application and configure credentials
3. Deploy to your preferred platform (Vercel, Railway, etc.)
4. Configure production environment variables
5. Set up CI/CD pipeline

The application is now ready for development and deployment!
