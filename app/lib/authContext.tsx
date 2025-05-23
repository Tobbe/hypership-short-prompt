"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { medusaClient } from "./medusaClient";

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
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, password: string) => Promise<void>;
};

// Define response types for TypeScript
interface MedusaResponse extends Response {
  customer?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Try to get the current user from Medusa
        const response = await medusaClient.client.fetch("/store/customers/me") as Response;
        if (response.ok) {
          const data = await response.json();
          const customer = data.customer;
          
          if (customer) {
            const medusaUser: User = {
              id: customer.id,
              firstName: customer.first_name || "",
              lastName: customer.last_name || "",
              email: customer.email,
            };
            
            setUser(medusaUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        // If there's an error, the user is not authenticated with Medusa
        // Check if we have a local user stored
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
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Authenticate with Medusa
      await medusaClient.auth.login("customer", "emailpass", {
        email,
        password,
      });
      
      // Get the customer details
      const response = await medusaClient.client.fetch("/store/customers/me") as Response;
      if (!response.ok) {
        throw new Error("Failed to retrieve customer details");
      }
      
      const data = await response.json();
      const customer = data.customer;
      
      // Create user object from Medusa customer
      const medusaUser: User = {
        id: customer.id,
        firstName: customer.first_name || "",
        lastName: customer.last_name || "",
        email: customer.email,
      };
      
      // Store user in state and localStorage
      setUser(medusaUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(medusaUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    }
  };

  // Signup function
  const signup = async (userData: Omit<User, "id"> & { password: string }) => {
    try {
      // Register with Medusa
      const response = await medusaClient.client.fetch("/store/customers", {
        method: "POST",
        body: JSON.stringify({
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: userData.email,
          password: userData.password,
        }),
      }) as Response;
      
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
      
      // Login after successful registration
      await login(userData.email, userData.password);
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Failed to create account. Please try again.");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Logout from Medusa
      await medusaClient.auth.logout();
    } catch (error) {
      console.error("Medusa logout error:", error);
    } finally {
      // Always clear local state regardless of Medusa logout success
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const response = await medusaClient.client.fetch("/store/customers/password-token", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }) as Response;
      
      if (!response.ok) {
        throw new Error("Failed to request password reset");
      }
    } catch (error) {
      console.error("Reset password request failed:", error);
      throw new Error("Failed to request password reset. Please try again.");
    }
  };

  // Update password function
  const updatePassword = async (token: string, password: string) => {
    try {
      const response = await medusaClient.client.fetch("/store/customers/password-reset", {
        method: "POST",
        body: JSON.stringify({
          token,
          password,
        }),
      }) as Response;
      
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
    } catch (error) {
      console.error("Password update failed:", error);
      throw new Error("Failed to update password. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      signup, 
      logout,
      resetPassword,
      updatePassword
    }}>
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
