import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

function Login() {
  const { login } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get("redirect");
    login(false, redirect);
  }, [login]);
  return <div></div>;
}

export default Login;
