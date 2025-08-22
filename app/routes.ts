import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';
export default [
  // Homepage - accessible to all users
  index('routes/index.tsx'),
  
  // Top-level logout route for convenience
  route('logout', 'routes/logout.tsx'),
  
  // Protected routes that require authentication
  layout('routes/layouts/authLayout.tsx', [
    route('profile', 'routes/profile.tsx'),
    // Add other protected routes here as needed
  ]),
  
  // Authentication routes
  ...prefix('auth', [
    route('login', 'routes/auth/login.tsx'),
    route('logout', 'routes/auth/logout.tsx'),
    route('callback', 'routes/auth/callback.tsx'),
  ]),
] satisfies RouteConfig;