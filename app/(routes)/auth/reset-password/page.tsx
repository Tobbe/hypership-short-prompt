"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Password reset requested for:", email);
        setIsSubmitting(false);
        setIsSubmitted(true);
        // In a real implementation, you would send a password reset email
      }, 1000);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <Container className="max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
            <p className="text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                <p>
                  If an account exists for {email}, you will receive an email with instructions on how to reset your password.
                </p>
              </div>
              <Link href="/auth/login">
                <Button variant="outline" fullWidth>
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>

              <div className="text-center">
                <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-800">
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
