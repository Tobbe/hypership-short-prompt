"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types";
import { formatPrice, truncateText } from "@/app/lib/utils";
import Button from "@/app/components/ui/Button";
import { useCart } from "@/app/lib/cartContext";
import { useSettings } from "@/app/lib/settingsContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showVAT, vatRate, language } = useSettings();
  const { id, name, description, price, imageUrl, category, inStock } = product;

  const productLink = `/${category === "performance" ? "performance-parts" : "aftermarket-parts"}/${id}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1">
          <Link href={productLink} className="hover:text-blue-600 transition-colors">
            {name}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {truncateText(description, 100)}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">{formatPrice(price, { showVAT, vatRate, language })}</span>
            {product.compatibility && (
              <span className="text-xs text-gray-500">
                {product.compatibility.length > 1 
                  ? `${product.compatibility.length} compatible models` 
                  : product.compatibility[0]}
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="primary" 
              fullWidth 
              onClick={() => addItem(product)}
              disabled={!inStock}
            >
              Add to Cart
            </Button>
            <Link href={productLink} className="block">
              <Button variant="outline" className="w-full">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
