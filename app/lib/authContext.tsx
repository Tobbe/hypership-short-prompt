"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the User type
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

// Define the AuthContext type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on mount
  useEffect(() => {
    // In a real implementation, you would check for an existing session
    // For now, we'll just check localStorage for demo purposes
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real implementation, you would make an API call to authenticate
    // For demo purposes, we'll just simulate a successful login
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: "user-123",
      firstName: "John",
      lastName: "Doe",
      email: email,
    };
    
    // Store user in state and localStorage
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Signup function
  const signup = async (userData: Omit<User, "id"> & { password: string }) => {
    // In a real implementation, you would make an API call to register
    // For demo purposes, we'll just simulate a successful registration
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
    
    // Store user in state and localStorage
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
