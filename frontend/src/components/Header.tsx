import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
// No props needed as we'll use the auth context
const Header: React.FC = () => {
  const { login, logout, user, isAuthenticated } = useAuth();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-pecha-secondary font-bold text-2xl">
              Workspace
            </span>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="text-gray-600 hover:text-pecha-secondary transition-colors flex items-center gap-1"
          >
            <Mail size={16} />
            <span>Contact Us</span>
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="text-gray-600 hover:text-pecha-secondary transition-colors flex items-center gap-1"
              >
                <UserCircle size={16} />
                <span>{user?.name ?? "Profile"}</span>
              </Link>
              <Button
                onClick={() => logout()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => login()}
              className="text-white bg-pecha-secondary hover:bg-pecha-secondary/90"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
