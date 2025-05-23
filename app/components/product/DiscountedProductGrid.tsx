import { Product } from "@/app/types";
import DiscountedProductCard from "./DiscountedProductCard";

interface DiscountedProductGridProps {
  discountedProducts: { product: Product; discountPercentage: number }[];
  title?: string;
}

export default function DiscountedProductGrid({ 
  discountedProducts, 
  title 
}: DiscountedProductGridProps) {
  if (discountedProducts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title || "Discounted Products"}</h2>
        <p className="text-gray-500">No discounted products available.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {discountedProducts.map(({ product, discountPercentage }) => (
          <DiscountedProductCard 
            key={product.id} 
            product={product} 
            discountPercentage={discountPercentage} 
          />
        ))}
      </div>
    </div>
  );
}
