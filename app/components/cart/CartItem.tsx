"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/app/types";
import { formatPrice } from "@/app/lib/utils";
import { useCart } from "@/app/lib/cartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="flex items-center py-5 border-b border-gray-200">
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {product.compatibility && product.compatibility.length > 0
            ? `Compatible with: ${product.compatibility[0]}${
                product.compatibility.length > 1
                  ? ` and ${product.compatibility.length - 1} more`
                  : ""
              }`
            : "Universal fit"}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center ml-4">
        <label htmlFor={`quantity-${product.id}`} className="sr-only">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-700"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <span className="sr-only">Decrease</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <input
            id={`quantity-${product.id}`}
            name={`quantity-${product.id}`}
            className="w-12 text-center border-x border-gray-300 py-1 text-gray-900"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0) {
                handleQuantityChange(val);
              }
            }}
          />
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-700"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <span className="sr-only">Increase</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="ml-6 text-right">
        <p className="text-base font-medium text-gray-900">
          {formatPrice(product.price * quantity)}
        </p>
      </div>

      {/* Remove Button */}
      <div className="ml-4">
        <button
          type="button"
          className="text-gray-400 hover:text-red-500"
          onClick={() => removeItem(product.id)}
        >
          <span className="sr-only">Remove</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
