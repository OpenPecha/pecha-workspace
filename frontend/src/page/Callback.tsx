import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Callback = () => {
  const navigate = useNavigate();
  const { isLoading, error: auth0Error, isAuthenticated } = useAuth0();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auth0 will handle the token processing automatically
    // We just need to redirect once authentication is complete
    if (!isLoading && isAuthenticated) {
      // Navigate to the home page after a short delay
      const timer = setTimeout(() => {
        navigate('/');
      }, 1500);
      return () => clearTimeout(timer);
    }

    // If there's an error from Auth0, capture it
    if (auth0Error) {
      setError(auth0Error.message);
    }
  }, [isLoading, isAuthenticated, auth0Error, navigate]);

  // Determine which content to display based on the current state
  const renderContent = () => {
    if (error || auth0Error) {
      return (
        <div className="text-red-500">
          <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
          <p>{error ?? (auth0Error ? auth0Error.message : '')}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-pecha-secondary text-white rounded hover:bg-pecha-secondary/90"
          >
            Return to Home
          </button>
        </div>
      );
    }

    if (isLoading || !isAuthenticated) {
      return (
        <>
          <h1 className="text-2xl font-bold mb-4">Processing your login...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pecha-secondary mx-auto"></div>
        </>
      );
    }

    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Authentication successful!</h1>
        <p className="text-center mb-4">Redirecting you to your profile...</p>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Callback;
