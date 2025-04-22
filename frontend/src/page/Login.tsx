import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

function Login() {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) return;
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get("redirect");
    login(false, redirect);
  }, [login, isAuthenticated]);
  return <div></div>;
}

export default Login;
