"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import CartItem from "@/app/components/cart/CartItem";
import { useCart } from "@/app/lib/cartContext";
import { formatPrice } from "@/app/lib/utils";
import { CartItem as CartItemType } from "@/app/types";

export default function CartPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Calculate shipping cost (free over 1000 SEK)
  const shippingCost = subtotal > 1000 ? 0 : 99;
  
  // Calculate total
  const total = subtotal + shippingCost;

  if (!mounted) {
    return (
      <div className="py-16">
        <Container>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </Container>
      </div>
    );
  }

  // Sample cart items for demonstration
  const sampleItems: CartItemType[] = [
    {
      product: {
        id: "perf-001",
        name: "High-Performance Air Intake System",
        description: "Increases airflow to the engine for improved horsepower and acceleration.",
        price: 299.99,
        category: "performance",
        imageUrl: "https://images.unsplash.com/photo-1600661653561-629509216228",
        compatibility: ["BMW M3 2018-2023", "BMW M4 2018-2023"],
        inStock: true,
        featured: true,
      },
      quantity: 1
    },
    {
      product: {
        id: "perf-002",
        name: "Performance Exhaust System",
        description: "Stainless steel construction with improved flow characteristics for increased power and aggressive sound.",
        price: 899.99,
        category: "performance",
        imageUrl: "https://images.unsplash.com/photo-1596741964346-791466b552b6",
        compatibility: ["Audi S4 2016-2022", "Audi S5 2016-2022"],
        inStock: true,
        featured: true,
      },
      quantity: 2
    },
    {
      product: {
        id: "after-001",
        name: "Replacement Headlight Assembly",
        description: "Direct replacement for damaged or worn headlight assemblies.",
        price: 249.99,
        category: "aftermarket",
        imageUrl: "https://images.unsplash.com/photo-1563136060-eed9c802c8e9",
        compatibility: ["Toyota Camry 2018-2023", "Toyota Corolla 2018-2023"],
        inStock: true,
        featured: true,
      },
      quantity: 1
    }
  ];

  // Use sample items if cart is empty
  const displayItems = items.length === 0 ? sampleItems : items;
  
  // Calculate sample totals if using sample items
  const displaySubtotal = items.length === 0 
    ? sampleItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    : subtotal;
  
  // Calculate shipping cost (free over 1000 SEK)
  const displayShippingCost = displaySubtotal > 1000 ? 0 : 99;
  
  // Calculate total
  const displayTotal = displaySubtotal + displayShippingCost;

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">
                  Cart Items ({displayItems.length})
                </h2>
                {items.length === 0 && (
                  <p className="text-sm text-blue-600 mt-2">
                    This is a sample cart for demonstration purposes.
                  </p>
                )}
              </div>

              <div className="divide-y divide-gray-200">
                {displayItems.map((item) => (
                  <div key={item.product.id} className="px-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => clearCart()}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                  <Link href="/">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(displaySubtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {displayShippingCost === 0
                      ? "Free"
                      : formatPrice(displayShippingCost)}
                  </span>
                </div>

                {displayShippingCost > 0 && (
                  <div className="text-sm text-gray-500 italic">
                    Free shipping on orders over {formatPrice(1000)}
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    {formatPrice(displayTotal)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                <div className="text-sm text-gray-500 text-center mt-4">
                  Secure checkout with encrypted payment processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
