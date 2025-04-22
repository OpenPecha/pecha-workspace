import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";
import Callback from "./page/Callback";
import Profile from "./page/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./page/Login";
import Logout from "./page/Logout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function AppContainer() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
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
