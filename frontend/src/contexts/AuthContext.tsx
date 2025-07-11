// This file is kept for backward compatibility but now just re-exports Auth0 hooks
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect } from "react";
import { setUmamiUser, clearUmamiUser } from "../analytics";

// Component wrapper for backward compatibility
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const redirectUri =
    import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin;

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        prompt: "none",
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

// Auth hook for backward compatibility - moved to separate export
export const useAuth = () => {
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  // Transform user data for our app
  const transformedUser = user
    ? {
        id: user.sub ?? "",
        email: user.email ?? "",
        name: user.name,
        picture: user.picture,
      }
    : null;

  // Handle Umami user identification
  useEffect(() => {
    if (isAuthenticated && transformedUser) {
      // Set user for Umami identification
      setUmamiUser({
        email: transformedUser.email,
        id: transformedUser.id,
        name: transformedUser.name,
        // Add additional properties if available
        sub: user?.sub,
      });
    } else if (!isAuthenticated) {
      // Clear user identification when logged out
      clearUmamiUser();
    }
  }, [isAuthenticated, transformedUser, user]);

  // Wrap the Auth0 logout to match our previous API
  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      },
    });
    localStorage.removeItem("access_token");
  };

  // Wrap login to match our previous API
  const login = (auto: boolean, redirect: string | null = null) => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: redirect ?? import.meta.env.VITE_AUTH0_REDIRECT_URI,
        scope: "openid profile email",
        prompt: auto ? "none" : "login",
      },
    });
  };

  // Provide a getToken method for backward compatibility
  const getToken = async (): Promise<string | null> => {
    try {
      return await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
    } catch (e) {
      console.error("Error getting token:", e);
      return null;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user: transformedUser,
    error: error ? error.message : null,
    login,
    logout,
    getToken,
  };
};
