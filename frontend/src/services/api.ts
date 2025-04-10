import { useAuth } from '@/auth/use-auth';
import { useCallback } from 'react';

const API_URL = 'http://localhost:8000';

// Custom hook for API calls
export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth();

  // Get auth token
  const getAuthToken = useCallback(async () => {
    if (!isAuthenticated) {
      return null;
    }
    
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://pecha-api',
        },
      });
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  // Create authenticated API request
  const fetchWithAuth = useCallback(async (
    endpoint: string, 
    options: RequestInit = {}
  ) => {
    const token = await getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers as Record<string, string>,
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    return response.json();
  }, [getAuthToken]);

  // Public endpoints that don't require authentication
  const publicApi = {
    getPublicResource: async () => {
      return fetch(`${API_URL}/api/public`).then(res => res.json());
    },
  };

  // Protected endpoints that require authentication
  const protectedApi = {
    getUserProfile: async () => {
      return fetchWithAuth('/api/user');
    },
    
    getProtectedResource: async () => {
      return fetchWithAuth('/api/private');
    },
  };

  return {
    ...publicApi,
    ...protectedApi,
    isAuthenticated,
  };
};
