import { useEffect } from 'react';
import type { LoaderFunctionArgs } from 'react-router';
import { useUserStore } from '../store/user';
import { auth0Service } from '../services/auth0.server';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ToolsSection from '../components/ToolsSection';
import VisionSection from '../components/VisionSection';
import type { User } from '../types/User';
import type { Tool, OldTool } from '../types/Tools';
import { db } from '~/lib/prisma';
import { DEFAULT_SEO_METADATA } from '../lib/seoMetadata';

export function meta() {
  const seoData = DEFAULT_SEO_METADATA;
  
  return [
    // Basic Meta Tags
    { title: seoData.title },
    { name: 'description', content: seoData.description },
    { name: 'keywords', content: seoData.keywords.join(', ') },
    
    // Open Graph Meta Tags for Social Sharing
    { property: 'og:title', content: seoData.openGraph.title },
    { property: 'og:description', content: seoData.openGraph.description },
    { property: 'og:image', content: seoData.openGraph.image },
    { property: 'og:url', content: seoData.openGraph.url },
    { property: 'og:type', content: seoData.openGraph.type },
    { property: 'og:site_name', content: seoData.openGraph.siteName },
    { property: 'og:locale', content: 'en_US' },
    
    // Twitter Card Meta Tags
    { name: 'twitter:card', content: seoData.twitter.card },
    { name: 'twitter:title', content: seoData.twitter.title },
    { name: 'twitter:description', content: seoData.twitter.description },
    { name: 'twitter:image', content: seoData.twitter.image },
    { name: 'twitter:site', content: seoData.twitter.site },
    { name: 'twitter:creator', content: seoData.twitter.site },
    
    // Additional SEO Meta Tags
    { name: 'canonical', content: seoData.openGraph.url },
    { name: 'application-name', content: 'Buddhist ai Studio ' },
    { name: 'apple-mobile-web-app-title', content: 'Buddhist ai Studio ' },
    
    // JSON-LD Structured Data
    {
      'script:ld+json': seoData.structuredData
    }
  ];
}

interface LoaderData {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLogout: boolean;
  tools: Tool[];
  oldTools: OldTool[];
  userbackId?: string;
}

export const getUrl=async (url: string|undefined,email: string)=> {
  if(url) return url;
  try {
    const res = await fetch(`https://stt.pecha.tools/api/mapping/${email}`);
    const mappedUrl = await res.json();
    return mappedUrl;
  } catch (err) {
  }
}

export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const isLogout = url.searchParams.get('logout') === 'true';
  
  // Get tools data regardless of authentication status
  const tools = await db.tools.findMany();
  const rawOldTools = await db.oldTools.findMany();

 
  

  const userbackId = process.env.USERBACK_ID;
  // If this is a logout redirect, don't try to authenticate
  if (isLogout) {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLogout: true,
      tools,
      oldTools:rawOldTools,
      userbackId,
    };
  }
  
  try {
    const isAuthenticated = await auth0Service.verifySession(request);
    const accessToken = await auth0Service.getAccessToken(request);
    const userInfo = await auth0Service.getUserInfo(accessToken);
    
    // Check if user is authenticated, but don't redirect if not
    if (isAuthenticated) {
// If department exists and tool.url is present, update path with department mapping API response
    const oldTools = await Promise.all(
  rawOldTools
    ?.filter((tool: OldTool) => tool.active !== false)
    ?.map(async (tool: OldTool) => {
      let path = tool.url || undefined;
      // If department exists and user email is available, update path with mapping API response
      if ( !tool.url && tool.department && userInfo.email) {
        try {
         const mappedUrl = await getUrl(path,userInfo.email);
        path = mappedUrl;
        } catch (err) {
          // Do nothing on error, keep original path
        }
      }else if(tool.url && userInfo.email){
        path = tool.url+"?"+`session=${encodeURIComponent(userInfo.email)}`;
      }else {
        path= undefined;
      }
      return {
        id: tool.id,
        title: tool.name ? tool.name.replaceAll("_", " ") : "",
        name: tool.name,
        description: tool.description || undefined,
        path,
        icon: tool.icon || undefined,
        demo: tool.demo || undefined,
        department: tool.department,
        active: tool.active || undefined,
      };
    }) || []
   )   || [];



      return {
        user: userInfo,
        accessToken,
        isAuthenticated: true,
        isLogout: false,
        tools,
        oldTools,
        userbackId,
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
    oldTools:rawOldTools,
  };
}

export default function Home({ loaderData }: { readonly loaderData?: LoaderData }) {
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