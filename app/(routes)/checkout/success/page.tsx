"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-16">
        <Container>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p className="text-lg font-medium text-gray-800 mb-6">
              Order Number: {orderId || "ACM-0000"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What's Next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    You'll receive an order confirmation email with details of your purchase.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Your order will be processed and prepared for shipping within 1-2 business days.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Once your order ships, you'll receive a shipping confirmation email with tracking information.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Your items will be delivered to your specified address. Standard delivery takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help With Your Order?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about your order, please contact our customer service team.
            </p>
            <a
              href="mailto:info@acm.se"
              className="text-blue-600 font-medium hover:text-blue-800 block mb-1"
            >
              info@acm.se
            </a>
            <a
              href="tel:+46123456789"
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              +46 123 456 789
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="primary">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/service-booking">
              <Button variant="outline">
                Book a Service
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
