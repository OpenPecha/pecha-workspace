"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { setUmamiUser, clearUmamiUser, injectUmami } from "@/lib/analytics";

interface User {
  id: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  login: (auto?: boolean, redirect?: string | null) => void;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: auth0User, error, isLoading } = useUser();

  const transformedUser = auth0User
    ? {
        id: auth0User.sub ?? "",
        email: auth0User.email ?? "",
        name: auth0User.name,
        picture: auth0User.picture,
      }
    : null;

  // Initialize Umami and handle user identification
  useEffect(() => {
    // Initialize Umami on mount
    injectUmami();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (transformedUser) {
        // Set user identification in Umami
        setUmamiUser({
          id: transformedUser.id,
          email: transformedUser.email,
          name: transformedUser.name,
        });
      } else {
        // Clear user identification when logged out
        clearUmamiUser();
      }
    }
  }, [transformedUser, isLoading]);

  const login = (auto = false, redirect: string | null = null) => {
    const loginUrl = auto ? "/api/auth/login?prompt=none" : "/api/auth/login";
    const redirectParam = redirect
      ? `?returnTo=${encodeURIComponent(redirect)}`
      : "";
    window.location.href = `${loginUrl}${redirectParam}`;
  };

  const logout = () => {
    window.location.href = "/api/auth/logout";
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const response = await fetch("/api/auth/token");
      if (response.ok) {
        const data = await response.json();
        return data.access_token;
      }
      return null;
    } catch (e) {
      console.error("Error getting token:", e);
      return null;
    }
  };

  const value: AuthContextType = {
    isAuthenticated: !!auth0User,
    isLoading,
    user: transformedUser,
    error: error ? error.message : null,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
