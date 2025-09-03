import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Link, Form } from "react-router";
import { useUserStore } from "../store/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header: React.FC = () => {
  const { user } = useUserStore();
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
    <header className=" py-4 z-50">
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
            <span className="text-primary font-bold text-2xl">
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
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none"
              >
                <Avatar title={user?.name || undefined}>
                  <AvatarImage src={user?.picture || undefined} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-foreground">{user?.name ?? "Profile"}</span>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-10 bg-popover shadow-md rounded-md py-2 w-48 z-50 border border-border">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground w-full text-left"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Form action="/auth/logout" method="get">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 rounded-full hover:bg-destructive/20 transition-colors duration-200 flex items-center space-x-2 mx-2 mt-1"
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
              <button
                type="submit"
                className="font-bold "
              >
                Sign in
              </button>
            </Form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
