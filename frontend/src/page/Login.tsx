import React, { useEffect } from "react";

function Login() {
  useEffect(() => {
    let domain=import.meta.env.VITE_AUTH0_DOMAIN;\
    let url=domain+'/authorize'
    // Construct the full authorization URL with required parameters
    let clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    let redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
    let scope = 'openid profile email';
    let responseType = 'code';
    
    let authUrl = `${url}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    
    // Redirect the user to Auth0 login page
    window.location.href = authUrl;
    
  }, []);
  return <div></div>;
}

export default Login;
