"use client";

import Medusa from "@medusajs/js-sdk";

// Create and configure the Medusa client
export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_API_URL || "http://localhost:9000",
  maxRetries: 3,
  auth: {
    // Use JWT token authentication by default
    type: "jwt",
  },
});

// Helper function to check if a user is authenticated with Medusa
export const isMedusaAuthenticated = async (): Promise<boolean> => {
  try {
    // Try to get the current user, which will fail if not authenticated
    const { customer } = await medusaClient.customers.retrieve();
    return !!customer;
  } catch (error) {
    return false;
  }
};
