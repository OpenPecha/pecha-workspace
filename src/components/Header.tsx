'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "@/hooks/useTheme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, X, Sun, Moon } from "lucide-react";

const Header: React.FC = () => {
  const { user, isLoading } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <header className="fixed  top-0 left-0 right-0 flex flex-col py-4 z-50 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/icon_logo.png"
              alt="Pecha Tools Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className=" font-bold text-2xl">
              Buddhist AI Studio
            </span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <a 
              href="#tools"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Tools
            </a>
            <a 
              href="#vision"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Visions
            </a>
          </nav>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          
          {user ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onKeyDown={(e) => e.key === 'Enter' && setShowDropdown(!showDropdown)}
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none"
              >
                <Avatar title={user?.name || undefined}>
                  <AvatarImage src={user?.picture || undefined} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-neutral-900 dark:text-neutral-100">{user?.name ?? "Profile"}</span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">Active</span>
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-10 bg-neutral-50 dark:bg-neutral-800 shadow-md rounded-md py-2 w-48 z-50 border border-neutral-200 dark:border-neutral-700">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 w-full text-left"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <a
                    href="/api/auth/logout"
                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 flex items-center space-x-2 mx-2 mt-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className=" bg-primary-200 dark:bg-primary-800 px-2 py-1 rounded-md text-primary-800 dark:text-neutral-300 hover:text-primary-700 dark:hover:text-primary-300"
            >
              Sign in
            </a>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-50/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-200/50 dark:border-neutral-700/50 z-40" ref={mobileMenuRef}>
          <div className="container mx-auto px-4 py-4">
            {!isLoading && user ? (
              <div className="space-y-4">
                {/* User Profile Section */}
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                  <Avatar title={user?.name || undefined}>
                    <AvatarImage src={user?.picture || undefined} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-neutral-900 dark:text-neutral-100 font-medium">{user?.name ?? "Profile"}</span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Active</span>
                  </div>
                </div>
                
                {/* Navigation Links */}
                <div className="space-y-2 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                  <a
                    href="#tools"
                    className="block px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Tools
                  </a>
                  <a
                    href="#vision"
                    className="block px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Visions
                  </a>
                </div>
                
                {/* Menu Items */}
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <a
                    href="/api/auth/logout"
                    className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-4">
                {/* Navigation Links for non-logged-in users */}
                <div className="space-y-2 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                  <a
                    href="#tools"
                    className="block px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Tools
                  </a>
                  <a
                    href="#vision"
                    className="block px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Visions
                  </a>
                </div>
                
                <a
                  href="/api/auth/login"
                  className="w-full px-4 py-3 text-center font-bold text-primary-600 dark:text-neutral-300 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-neutral-50 border border-primary-600 dark:border-primary-400 rounded-md transition-colors duration-200 block"
                >
                  Sign in
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

