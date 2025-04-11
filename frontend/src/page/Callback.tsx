import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Callback = () => {
  const navigate = useNavigate();
  const { isLoading, error: auth0Error, isAuthenticated, login } = useAuth();

  useEffect(() => {
    // Auth0 will handle the token processing automatically
    // We just need to redirect once authentication is complete
    if (isAuthenticated) {
      // Navigate to the home page after a short delay
      navigate("/");
    }

    // If there's an error from Auth0, capture it
    if (auth0Error?.message.includes("login_required")) {
      console.log("Silent login failed: user must log in manually.");
      login(false);
    }
  }, [isLoading, isAuthenticated, auth0Error, navigate, login]);

  // Determine which content to display based on the current state

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          redirecting login...
        </div>
      </div>
    </div>
  );
};

export default Callback;
