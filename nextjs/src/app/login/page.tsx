"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginComponent() {
  const { login, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) return;
    const redirect = searchParams.get("redirect");
    login(false, redirect);
  }, [login, isAuthenticated, searchParams]);

  return <div></div>;
}

function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}

export default Login;
