// Auth hook for backward compatibility
import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    error,
    loginWithRedirect, 
    logout: auth0Logout,
    getAccessTokenSilently 
  } = useAuth0();

  // Wrap the Auth0 logout to match our previous API
  const logout = () => {
    auth0Logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
  };

  // Wrap login to match our previous API
  const login = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
        scope: 'openid profile email'
      }
    });
  };

  // Provide a getToken method for backward compatibility
  const getToken = async (): Promise<string | null> => {
    try {
      return await getAccessTokenSilently();
    } catch (e) {
      console.error('Error getting token:', e);
      return null;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user: user ? {
      id: user.sub ?? '',
      email: user.email ?? '',
      name: user.name,
      picture: user.picture
    } : null,
    error: error ? error.message : null,
    login,
    logout,
    getToken
  };
};
