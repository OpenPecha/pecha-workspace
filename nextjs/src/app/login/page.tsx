"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) return;
    const redirect = searchParams.get("redirect");
    login(false, redirect);
  }, [login, isAuthenticated, searchParams]);

  return <div></div>;
}

export default Login;
