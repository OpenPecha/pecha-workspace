import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addTool, getTools, deleteTool, Tool } from "@/api/tools";
import { getUsers, updateUserAdmin, User } from "@/api/user";
import { Trash2, Search, UserCog } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Admin: React.FC = () => {
  const { user, isAuthenticated, isLoading, getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Tool form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    link: "",
    demo: "",
    icon: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // User management state
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"tools" | "users">("tools");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Fetch existing tools
  const { data: tools, isLoading: toolsLoading } = useQuery({
    queryKey: ["toolsList"],
    queryFn: () => getTools(),
  });

  // Fetch users with search and pagination
  const {
    data: usersData,
    isLoading: usersLoading,
    isPending: usersPending,
  } = useQuery({
    queryKey: ["usersList", userSearchQuery, currentPage, pageSize],
    queryFn: () =>
      getUsers({
        search: userSearchQuery,
        page: currentPage,
        pageSize: pageSize,
      }),
    // Debounce search queries
    staleTime: 500,
  });

  // Add tool mutation
  const addToolMutation = useMutation({
    mutationFn: addTool,
    onSuccess: () => {
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
        link: "",
        demo: "",
        icon: "",
      });

      // Invalidate and refetch tools
      queryClient.invalidateQueries({ queryKey: ["toolsList"] });
    },
  });

  // Delete tool mutation
  const deleteToolMutation = useMutation({
    mutationFn: deleteTool,
    onSuccess: () => {
      // Invalidate and refetch tools
      queryClient.invalidateQueries({ queryKey: ["toolsList"] });
    },
  });

  // Update user admin status mutation
  const updateUserAdminMutation = useMutation({
    mutationFn: ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) =>
      updateUserAdmin(userId, isAdmin),
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({
        queryKey: ["usersList", userSearchQuery, currentPage, pageSize],
      });
    },
  });

  // Handle delete tool
  const handleDeleteTool = (id: string) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      deleteToolMutation.mutate(id);
    }
  };

  // Handle toggle user admin status
  const handleToggleUserAdmin = (userId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const action = newStatus ? "promote to admin" : "remove admin status from";

    if (confirm(`Are you sure you want to ${action} this user?`)) {
      updateUserAdminMutation.mutate({ userId, isAdmin: newStatus });
    }
  };

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tool name is required";
    }

    if (!formData.icon.trim()) {
      newErrors.icon = "Icon URL is required";
    }

    if (!formData.link.trim()) {
      newErrors.link = "Tool link is required";
    }

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Convert price to number if provided
    const toolData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
    };

    addToolMutation.mutate(toolData);
  };

  // Fetch and store token when authenticated
  React.useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Get and store the token
      const fetchToken = async () => {
        try {
          const token = await getToken();
          if (token) {
            localStorage.setItem("access_token", token);
          }
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };

      fetchToken();
    } else if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, user, navigate, getToken]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => setActiveTab("tools")}
          variant={activeTab === "tools" ? "default" : "outline"}
        >
          Manage Tools
        </Button>
        <Button
          onClick={() => setActiveTab("users")}
          variant={activeTab === "users" ? "default" : "outline"}
        >
          Manage Users
        </Button>
      </div>

      {activeTab === "tools" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Tool Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Tool</CardTitle>
              <CardDescription>
                Create a new tool that will appear on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tool Name <ImportantStrix />
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description <ImportantStrix />
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tool Link <ImportantStrix />
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.link ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.link && (
                    <p className="text-red-500 text-sm mt-1">{errors.link}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="icon"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Icon URL <ImportantStrix />
                  </label>
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.icon ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.icon && (
                    <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="demo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Demo Link
                  </label>
                  <input
                    type="text"
                    id="demo"
                    name="demo"
                    value={formData.demo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={addToolMutation.isPending}
                >
                  {addToolMutation.isPending ? "Adding..." : "Add Tool"}
                </Button>

                {addToolMutation.isError && (
                  <p className="text-red-500 text-sm mt-2">
                    Error adding tool. Please try again.
                  </p>
                )}

                {addToolMutation.isSuccess && (
                  <p className="text-green-500 text-sm mt-2">
                    Tool added successfully!
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Existing Tools List */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Tools</CardTitle>
              <CardDescription>View and manage existing tools</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                if (toolsLoading) {
                  return <p>Loading tools...</p>;
                }

                if (tools && tools.length > 0) {
                  return (
                    <div className="space-y-4">
                      {tools.map((tool: Tool) => {
                        // Render tool item
                        return (
                          <div
                            key={tool.id}
                            className="p-4 border border-gray-200 rounded-md"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {tool.icon && (
                                  <img
                                    src={tool.icon}
                                    alt={tool.name}
                                    className="w-8 h-8"
                                  />
                                )}
                                <h3 className="font-medium">{tool.name}</h3>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteTool(tool.id!)}
                                title="Delete tool"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                            {tool.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {tool.description}
                              </p>
                            )}
                            <div className="flex gap-2 mt-2">
                              <a
                                href={tool.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                View Tool
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                return <p>No tools found.</p>;
              })()}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users by email or name..."
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md"
                  value={userSearchQuery}
                  onChange={handleSearchChange}
                />
                {usersPending && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                )}
              </div>

              {(() => {
                if (usersLoading) {
                  return <p>Loading users...</p>;
                }

                if (!usersData?.items || usersData.items.length === 0) {
                  return (
                    <p className="text-gray-500">
                      {userSearchQuery
                        ? "No users match your search."
                        : "No users found."}
                    </p>
                  );
                }

                return (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            User
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Admin Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usersData?.items.map((user: User) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {user.picture ? (
                                  <img
                                    className="h-10 w-10 rounded-full mr-3"
                                    src={user.picture}
                                    alt={user.name ?? user.email}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                    <span className="text-gray-500">
                                      {(user.name ?? user.email ?? "?")
                                        .charAt(0)
                                        .toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.name ?? "(No name)"}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                    ID: {user.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.isAdmin
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {user.isAdmin ? "Admin" : "User"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={
                                  user.isAdmin
                                    ? "text-amber-600"
                                    : "text-blue-600"
                                }
                                onClick={() =>
                                  handleToggleUserAdmin(user.id, user.isAdmin)
                                }
                                disabled={updateUserAdminMutation.isPending}
                              >
                                <UserCog className="h-4 w-4 mr-1" />
                                {user.isAdmin ? "Remove Admin" : "Make Admin"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              {/* Pagination controls */}
              {usersData && usersData.pages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {(usersData.page - 1) * usersData.page_size + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            usersData.page * usersData.page_size,
                            usersData.total
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">{usersData.total}</span>{" "}
                        users
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            currentPage === 1
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {Array.from(
                          { length: usersData.pages },
                          (_, i) => i + 1
                        )
                          .filter((page) => {
                            // Show first page, last page, current page, and pages around current page
                            return (
                              page === 1 ||
                              page === usersData.pages ||
                              Math.abs(page - currentPage) <= 1
                            );
                          })
                          .map((page, index, array) => {
                            // Add ellipsis where needed
                            if (index > 0 && array[index - 1] !== page - 1) {
                              return (
                                <span
                                  key={`ellipsis-${page}`}
                                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                >
                                  ...
                                </span>
                              );
                            }

                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={
                                  currentPage === page ? "page" : undefined
                                }
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                  currentPage === page
                                    ? "bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === usersData.pages}
                          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            currentPage === usersData.pages
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

function ImportantStrix() {
  return <span className="text-red-500">*</span>;
}

export default Admin;
