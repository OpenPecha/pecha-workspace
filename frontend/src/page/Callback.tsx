import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { create_user } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

const Callback = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error: auth0Error,
    isAuthenticated,
    login,
    getToken,
  } = useAuth();

  const createUserMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return create_user(token!);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      createUserMutation.mutate();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (auth0Error?.message.includes("login_required")) {
      console.log("Silent login failed: user must log in manually.");
      login(false);
    }
  }, [isLoading, auth0Error, navigate, login]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {createUserMutation.isPending
            ? "Processing login..."
            : "Redirecting..."}
        </div>
      </div>
    </div>
  );
};

export default Callback;
