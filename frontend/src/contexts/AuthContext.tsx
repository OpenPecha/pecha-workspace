// This file is kept for backward compatibility but now just re-exports Auth0 hooks
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

// Component wrapper for backward compatibility
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
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

  // Wrap the Auth0 logout to match our previous API
  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  // Wrap login to match our previous API
  const login = (auto: boolean) => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
        scope: "openid profile email",
        prompt: auto ? "none" : "login",
      },
    });
  };

  // Provide a getToken method for backward compatibility
  const getToken = async (): Promise<string | null> => {
    try {
      return await getAccessTokenSilently();
    } catch (e) {
      console.error("Error getting token:", e);
      return null;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user: user
      ? {
          id: user.sub ?? "",
          email: user.email ?? "",
          name: user.name,
          picture: user.picture,
        }
      : null,
    error: error ? error.message : null,
    login,
    logout,
    getToken,
  };
};
