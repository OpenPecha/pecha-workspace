import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Link, Form } from "react-router";
import { LogOut } from "lucide-react";
import { useUserStore } from "../store/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header: React.FC = () => {
  const { user, clearUser } = useUserStore();
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
    <header className="bg-white shadow-sm border-b border-gray-200 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/icon_logo.png"
              alt="Pecha Tools Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-indigo-700 font-bold text-2xl">
              Pecha AI Tools
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onKeyDown={(e) => e.key === 'Enter' && setShowDropdown(!showDropdown)}
                className="text-gray-600 hover:text-indigo-700 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none"
              >
                <Avatar title={user?.name || undefined}>
                  <AvatarImage src={user?.picture || undefined} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{user?.name ?? "Profile"}</span>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-48 z-50 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Form action="/auth/logout" method="get">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </Form>
                </div>
              )}
            </div>
          ) : (
            <Form action="/auth/login" method="post">
              <Button
                type="submit"
                className="text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in
              </Button>
            </Form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
