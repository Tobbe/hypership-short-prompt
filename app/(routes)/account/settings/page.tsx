"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { useAuth } from "@/app/lib/authContext";

export default function AccountSettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else if (user) {
      // Populate form with user data
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [isAuthenticated, router, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Updated user settings:", formData);
      setIsSubmitting(false);
      setSuccessMessage("Your account information has been updated successfully.");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="py-12">
      <Container>
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
              <p>{successMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
          
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <p className="text-gray-600 mb-4">
              To change your password, please use the password reset functionality.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push("/auth/reset-password")}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
