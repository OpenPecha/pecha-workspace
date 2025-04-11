import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";

function Login() {
  const { login } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get("redirect");
    login(true, redirect);
  }, [login]);
  return <div></div>;
}

export default Login;
