import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";

function Login() {
  const { login } = useAuth();
  useEffect(() => {
    login(true);
  }, [login]);
  return <div></div>;
}

export default Login;
