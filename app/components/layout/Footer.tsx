import Link from "next/link";
import Container from "@/app/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ACM</h3>
            <p className="text-gray-400 mb-4">
              Your trusted source for performance and aftermarket car parts, and professional service.
            </p>
            <p className="text-gray-400">
              © {currentYear} ACM. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/performance-parts" className="text-gray-400 hover:text-white transition-colors">
                  Performance Parts
                </Link>
              </li>
              <li>
                <Link href="/aftermarket-parts" className="text-gray-400 hover:text-white transition-colors">
                  Aftermarket Parts
                </Link>
              </li>
              <li>
                <Link href="/service-booking" className="text-gray-400 hover:text-white transition-colors">
                  Service Booking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400">
              <p>123 Auto Street</p>
              <p>Stockholm, Sweden</p>
              <p className="mt-2">
                <a href="mailto:info@acm.se" className="hover:text-white transition-colors">
                  info@acm.se
                </a>
              </p>
              <p>
                <a href="tel:+46123456789" className="hover:text-white transition-colors">
                  +46 123 456 789
                </a>
              </p>
            </address>
          </div>
        </div>
      </Container>
    </footer>
  );
}
