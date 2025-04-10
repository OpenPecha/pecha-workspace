import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";

function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  return <div></div>;
}

export default Logout;
