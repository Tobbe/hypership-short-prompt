import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import ProductGrid from "@/app/components/product/ProductGrid";
import { getFeaturedProducts, getDiscountedProducts } from "@/app/lib/mockData";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const discountedProducts = getDiscountedProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
          alt="ACM Performance & Aftermarket Parts"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Upgrade Your Driving Experience
              </h1>
              <p className="text-lg lg:text-xl mb-8">
                Premium performance parts, quality aftermarket components, and expert service for your vehicle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/performance-parts">
                  <Button variant="primary" size="lg">
                    Shop Performance Parts
                  </Button>
                </Link>
                <Link href="/service-booking">
                  <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm">
                    Book a Service
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Parts */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=1200&q=80"
                  alt="Performance Parts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Performance Parts</h3>
                <p className="text-gray-600 mb-4">
                  Upgrade your vehicle with high-quality performance parts designed to enhance power, handling, and driving experience.
                </p>
                <Link href="/performance-parts">
                  <Button variant="primary" fullWidth>
                    Explore Performance Parts
                  </Button>
                </Link>
              </div>
            </div>

            {/* Aftermarket Parts */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                  alt="Aftermarket Parts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Aftermarket Parts</h3>
                <p className="text-gray-600 mb-4">
                  Find quality replacement parts for your vehicle, from brake pads to filters, all from trusted manufacturers.
                </p>
                <Link href="/aftermarket-parts">
                  <Button variant="primary" fullWidth>
                    Explore Aftermarket Parts
                  </Button>
                </Link>
              </div>
            </div>

            {/* Service Booking */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
                  alt="Service Booking"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Service & Repair</h3>
                <p className="text-gray-600 mb-4">
                  Schedule professional service and repair with our experienced technicians for optimal vehicle performance.
                </p>
                <Link href="/service-booking">
                  <Button variant="primary" fullWidth>
                    Book a Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Special Offers - Discounted Products */}
      <section className="py-16 bg-red-50">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Limited-time discounts on select performance and aftermarket parts. Don't miss these deals!
          </p>
          <ProductGrid products={discountedProducts} />
          <div className="text-center mt-8">
            <Link href="/performance-parts">
              <Button variant="primary" size="lg">
                View All Deals
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover our selection of top-rated performance and aftermarket parts, chosen for their quality, reliability, and customer satisfaction.
          </p>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-8">
            <Link href="/performance-parts">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ACM
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p>
                All our products are sourced from trusted manufacturers and come with warranty.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p>
                Quick shipping on all orders with real-time tracking information.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p>
                Our knowledgeable team is ready to assist with product selection and technical advice.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p>
                Multiple payment options with secure checkout for your peace of mind.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Upgrade Your Vehicle?
            </h2>
            <p className="text-gray-600 mb-8">
              Browse our extensive catalog of performance and aftermarket parts, or schedule a service appointment with our expert technicians.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/performance-parts">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/service-booking">
                <Button variant="outline" size="lg">
                  Book Service
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
