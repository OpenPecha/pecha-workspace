import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarImage } from "./ui/avatar";
// No props needed as we'll use the auth context
const Header: React.FC = () => {
  const { login, logout, user, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {isAuthenticated ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-600 hover:text-pecha-secondary transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Avatar title={user?.name}>
                  <AvatarImage src={user?.picture} />
                </Avatar>
                <span>{user?.name ?? "Profile"}</span>
              </div>
              {showDropdown && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-48 z-20 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => login(false)}
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
