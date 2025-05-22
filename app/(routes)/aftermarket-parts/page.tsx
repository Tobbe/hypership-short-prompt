import { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ProductGrid from "@/app/components/product/ProductGrid";
import { aftermarketParts } from "@/app/lib/mockData";

export const metadata: Metadata = {
  title: "Aftermarket Parts | ACM",
  description: "Find quality replacement parts for your vehicle, from brake pads to filters, all from trusted manufacturers.",
};

export default function AftermarketPartsPage() {
  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Aftermarket Parts</h1>
          <p className="text-gray-600 max-w-4xl">
            Keep your vehicle running smoothly with our selection of high-quality aftermarket parts. 
            We offer a wide range of replacement components from trusted manufacturers, 
            designed to provide reliable performance and long-lasting durability. 
            From brake pads to filters, find everything you need for your vehicle maintenance and repairs.
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Professional Installation Services
          </h2>
          <p className="text-green-700">
            Don't have time to install the parts yourself? Our certified technicians 
            can handle the installation for you, ensuring everything is properly fitted. 
            <a 
              href="/service-booking" 
              className="font-medium underline ml-1 hover:text-green-900"
            >
              Schedule a service appointment
            </a>.
          </p>
        </div>

        <ProductGrid 
          products={aftermarketParts} 
          title="All Aftermarket Parts"
        />
      </Container>
    </div>
  );
}
