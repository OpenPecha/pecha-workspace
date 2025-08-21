import { useEffect } from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { useUserStore } from '../store/user';
import { auth0Service } from '../services/auth0.server';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ToolsSection from '../components/ToolsSection';
import VisionSection from '../components/VisionSection';
import type { User } from '../types/User';
import { db } from '~/lib/prisma';

export function meta() {
  return [
    { title: 'Pecha AI Tools - Buddhist Manuscript Platform' },
    { name: 'description', content: 'AI-powered digital platform for Buddhist manuscripts, providing specialized tools for translation, transcription, and preservation of ancient Pecha texts.' }
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isLogout = url.searchParams.get('logout') === 'true';
  
  // Get tools data regardless of authentication status
  const tools = await db.tools.findMany();
  
  // If this is a logout redirect, don't try to authenticate
  if (isLogout) {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLogout: true,
      tools,
    };
  }
  
  try {
    // Check if user is authenticated, but don't redirect if not
    const isAuthenticated = await auth0Service.verifySession(request);
    if (isAuthenticated) {
      const accessToken = await auth0Service.getAccessToken(request);
      const userInfo = await auth0Service.getUserInfo(accessToken);
      return {
        user: userInfo,
        accessToken,
        isAuthenticated: true,
        isLogout: false,
        tools,
      };
    }
  } catch (error) {
    // If there's an error with authentication, just continue without user data
    console.log('No valid session found, showing homepage as guest:', error);
  }
  
  // Return for non-authenticated users
  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLogout: false,
    tools,
  };
}

export default function Home({ loaderData }: { readonly loaderData?: { user: User | null; accessToken: string | null; isAuthenticated: boolean; isLogout: boolean; tools: any[] } }) {
  const { setUser, setAccessToken, clearUser } = useUserStore();
  
  useEffect(() => {
    if (loaderData?.isLogout) {
      // Clear user state when logout flag is present
      clearUser();
      // Clean up the URL by removing the logout parameter
      if (typeof window !== 'undefined' && window.location.search.includes('logout=true')) {
        window.history.replaceState({}, '', '/');
      }
    } else if (loaderData?.isAuthenticated && loaderData.user && loaderData.accessToken) {
      setUser(loaderData.user);
      setAccessToken(loaderData.accessToken);
    } else if (loaderData && !loaderData.isAuthenticated) {
      // Clear user state when not authenticated
      clearUser();
    }
  }, [loaderData, setUser, setAccessToken, clearUser]);

  return (
    <Layout>
      <div className="pt-0">
        <Hero />
        <ToolsSection />
        <VisionSection />
      </div>
    </Layout>
  );
}