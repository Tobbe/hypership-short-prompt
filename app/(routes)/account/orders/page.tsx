"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/app/components/ui/Container";
import { useAuth } from "@/app/lib/authContext";

export default function OrderHistoryPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="py-12">
      <Container>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">Order History</h1>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-center py-8">
              You don&apos;t have any orders yet.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
