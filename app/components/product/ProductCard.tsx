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
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col relative hover:shadow-lg transition-shadow group">
      <Link href={productLink} className="absolute inset-0 z-10">
        <span className="sr-only">View {name} details</span>
      </Link>
      
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-20">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {truncateText(description, 100)}
        </p>
        
        <div className="mt-auto">
          <div className="mb-3">
            <span className="text-lg font-bold block">{formatPrice(price, { showVAT, vatRate, language })}</span>
          </div>
          
          <div className="relative z-20">
            <Button 
              variant="primary" 
              fullWidth 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              disabled={!inStock}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
