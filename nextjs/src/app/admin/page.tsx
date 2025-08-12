"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pecha-secondary"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
        <p className="text-gray-600 mb-4">
          This is the admin dashboard. Here you can manage tools, users, and
          other administrative tasks.
        </p>

        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-800">User Management</h3>
            <p className="text-sm text-gray-600">
              Manage user accounts and permissions
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-800">Tool Management</h3>
            <p className="text-sm text-gray-600">
              Add, edit, and remove tools from the platform
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-800">Analytics</h3>
            <p className="text-sm text-gray-600">
              View platform usage and analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
