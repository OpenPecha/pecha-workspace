import React, { useEffect } from "react";

function Login() {
  useEffect(() => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const url = "https://" + domain + "/authorize";
    // Construct the full authorization URL with required parameters
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
    const scope = "openid profile email";
    const responseType = "id_token token";

    const authUrl = `${url}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    // Redirect the user to Auth0 login page
    window.location.href = authUrl;
  }, []);
  return <div></div>;
}

export default Login;
