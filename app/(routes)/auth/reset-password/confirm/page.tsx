"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";

export default function ResetPasswordConfirmPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    // In a real implementation, you would validate the token here
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Password reset with token:", token);
        console.log("New password:", formData.password);
        setIsSubmitting(false);
        setIsSubmitted(true);
        // In a real implementation, you would send the new password to the server
      }, 1000);
    }
  };

  if (tokenError) {
    return (
      <div className="py-12 md:py-20">
        <Container className="max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Invalid or Expired Link</h1>
              <p className="text-gray-600">
                The password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>
            <div className="text-center">
              <Link href="/auth/reset-password">
                <Button variant="primary" fullWidth>
                  Request New Reset Link
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <Container className="max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create New Password</h1>
            <p className="text-gray-600">
              Enter your new password below
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                <p>
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
              </div>
              <Link href="/auth/login">
                <Button variant="primary" fullWidth>
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting Password..." : "Reset Password"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
