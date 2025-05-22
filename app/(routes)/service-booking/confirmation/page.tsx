import { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "Booking Confirmation | ACM",
  description: "Your service appointment has been successfully scheduled.",
};

export default function ServiceBookingConfirmationPage() {
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
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your service appointment has been successfully scheduled. We've sent a confirmation email with all the details.
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
                    You'll receive a confirmation email with your appointment details.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Our service advisor will call you 24 hours before your appointment to confirm.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    Arrive at our service center at your scheduled time with your vehicle.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    We'll perform the requested service and keep you updated on progress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need to Make Changes?
            </h3>
            <p className="text-gray-600 mb-4">
              If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.
            </p>
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
            <Link href="/performance-parts">
              <Button variant="outline">
                Browse Performance Parts
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
