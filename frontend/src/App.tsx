import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Callback from "./page/Callback";
import Profile from "./page/Profile";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
        scope: "openid profile email"
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
