"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/authContext";

export default function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
        onClick={isAuthenticated ? () => setIsOpen(!isOpen) : handleLoginClick}
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {isAuthenticated ? (
            <span className="text-sm font-medium">
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </div>
        <span className="ml-2 hidden md:block">
          {isAuthenticated ? `${user?.firstName} ${user?.lastName}` : "Sign In"}
        </span>
        {isAuthenticated && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-1 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {isAuthenticated && isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <Link
            href="/account/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Order History
          </Link>
          
          <Link
            href="/account/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
