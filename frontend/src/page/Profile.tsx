import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { formatUserName } from "@/lib/utils";

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  picture?: string;
}

const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !isLoading) {
      navigate("/");
      return;
    }

    // Use the user data from auth context
    const fetchProfile = async () => {
      try {
        setLoading(true);

        if (user) {
          // Use user data from our Auth context
          setProfile({
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
          });
          setError(null);
        } else {
          throw new Error("No user data available");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate, user, isLoading]);

  if (loading || isLoading) {
    return (
      <div className="container mx-auto mt-10 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pecha-secondary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-pecha-secondary text-white rounded hover:bg-pecha-secondary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-pecha-primary">
          User Profile
        </h1>

        {profile && (
          <div className="flex flex-col md:flex-row gap-6">
            {profile.picture && (
              <div className="flex-shrink-0">
                <img
                  src={profile.picture}
                  alt={profile.name ?? "User"}
                  className="w-24 h-24 rounded-full object-cover border-2 border-pecha-secondary"
                />
              </div>
            )}

            <div className="flex-grow">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {formatUserName(profile.name) ?? "Anonymous User"}
                </h2>
                {profile.email && (
                  <p className="text-gray-600">{profile.email}</p>
                )}
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Account Information
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">User ID:</span> {profile.id}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Authentication:</span> Okta SSO
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Issuer:</span>{" "}
                  {import.meta.env.VITE_OKTA_ISSUER}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 bg-pecha-secondary text-white rounded hover:bg-pecha-secondary/90"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
