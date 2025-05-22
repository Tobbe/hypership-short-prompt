import { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ProductGrid from "@/app/components/product/ProductGrid";
import { performanceParts } from "@/app/lib/mockData";

export const metadata: Metadata = {
  title: "Performance Parts | ACM",
  description: "Browse our selection of high-quality performance parts to enhance your vehicle's power, handling, and driving experience.",
};

export default function PerformancePartsPage() {
  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Performance Parts</h1>
          <p className="text-gray-600 max-w-4xl">
            Upgrade your vehicle with our premium selection of performance parts. 
            From air intake systems to exhaust upgrades, we offer components 
            designed to enhance power, improve handling, and elevate your driving 
            experience. All our performance parts are sourced from trusted 
            manufacturers and come with warranty.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Expert Installation Available
          </h2>
          <p className="text-blue-700">
            Need help installing your performance parts? Our certified technicians 
            can professionally install your upgrades. 
            <a 
              href="/service-booking" 
              className="font-medium underline ml-1 hover:text-blue-900"
            >
              Book a service appointment
            </a>.
          </p>
        </div>

        <ProductGrid 
          products={performanceParts} 
          title="All Performance Parts"
        />
      </Container>
    </div>
  );
}
