"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "../types";

// Sample cart items for demonstration
const sampleItems: CartItem[] = [
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

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  usingSampleItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [actualItems, setActualItems] = useState<CartItem[]>([]);
  const [sampleItemsState, setSampleItemsState] = useState<CartItem[]>(sampleItems);
  const [mounted, setMounted] = useState(false);

  // Initialize cart from localStorage on client side
  useEffect(() => {
    setMounted(true);
    const storedCart = localStorage.getItem("acm-cart");
    if (storedCart) {
      try {
        setActualItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("acm-cart");
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("acm-cart", JSON.stringify(actualItems));
    }
  }, [actualItems, mounted]);

  // Use sample items if actual cart is empty
  const usingSampleItems = actualItems.length === 0;
  const items = usingSampleItems ? sampleItemsState : actualItems;

  const addItem = (product: Product) => {
    // If using sample items, switch to actual items
    if (usingSampleItems) {
      setActualItems([{ product, quantity: 1 }]);
      return;
    }

    setActualItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    if (usingSampleItems) {
      setSampleItemsState((prevItems) =>
        prevItems.filter((item) => item.product.id !== productId)
      );
    } else {
      setActualItems((prevItems) =>
        prevItems.filter((item) => item.product.id !== productId)
      );
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    if (usingSampleItems) {
      setSampleItemsState((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } else {
      setActualItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    if (usingSampleItems) {
      setSampleItemsState([]);
    } else {
      setActualItems([]);
    }
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        usingSampleItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
