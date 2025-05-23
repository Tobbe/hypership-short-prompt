import { Product } from "@/app/types";
import ProductCard from "./ProductCard";

type ProductItem = Product | { product: Product; discountPercentage: number };

interface ProductGridProps {
  products: ProductItem[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title || "Products"}</h2>
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item) => {
          // Check if the item is a Product or a discounted product object
          const isDiscountedProduct = 'product' in item && 'discountPercentage' in item;
          
          if (isDiscountedProduct) {
            const { product, discountPercentage } = item as { product: Product; discountPercentage: number };
            return (
              <ProductCard 
                key={product.id} 
                product={product} 
                discountPercentage={discountPercentage} 
              />
            );
          } else {
            return (
              <ProductCard 
                key={(item as Product).id} 
                product={item as Product} 
              />
            );
          }
        })}
      </div>
    </div>
  );
}
