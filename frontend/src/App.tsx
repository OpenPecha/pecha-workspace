import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Callback from "./page/Callback";
import Profile from "./page/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./page/Login";
import Logout from "./page/Logout";
import Admin from "./page/Admin";
import { injectUmami } from "./analytics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

function AppContainer() {
  // Initialize Umami analytics
  useEffect(() => {
    // Always inject Umami in production, and in development if enabled
    injectUmami();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
