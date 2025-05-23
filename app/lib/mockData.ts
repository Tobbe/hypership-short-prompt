import { Product, ServiceBooking } from "../types";

export const performanceParts: Product[] = [
  {
    id: "perf-001",
    name: "High-Performance Air Intake System",
    description: "Increases airflow to the engine for improved horsepower and acceleration.",
    price: 299.99,
    category: "performance",
    imageUrl: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["BMW M3 2018-2023", "BMW M4 2018-2023"],
    inStock: true,
    featured: true,
  },
  {
    id: "perf-002",
    name: "Performance Exhaust System",
    description: "Stainless steel construction with improved flow characteristics for increased power and aggressive sound.",
    price: 899.99,
    category: "performance",
    imageUrl: "https://images.unsplash.com/photo-1596741964346-791466b552b6?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Audi S4 2016-2022", "Audi S5 2016-2022"],
    inStock: true,
    featured: true,
  },
  {
    id: "perf-003",
    name: "Sport Suspension Kit",
    description: "Lowers ride height and improves handling with performance-tuned springs and dampers.",
    price: 1299.99,
    category: "performance",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Mercedes C-Class 2015-2022", "Mercedes E-Class 2016-2022"],
    inStock: true,
  },
  {
    id: "perf-004",
    name: "Performance Brake Kit",
    description: "Larger rotors and multi-piston calipers for improved stopping power and fade resistance.",
    price: 1499.99,
    category: "performance",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Porsche 911 2018-2023", "Porsche Cayman 2018-2023"],
    inStock: true,
  },
  {
    id: "perf-005",
    name: "ECU Tuning Kit",
    description: "Reprograms the engine control unit for optimized performance and throttle response.",
    price: 799.99,
    category: "performance",
    imageUrl: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Volkswagen Golf GTI 2017-2023", "Volkswagen Golf R 2017-2023"],
    inStock: true,
    featured: true,
  },
  {
    id: "perf-006",
    name: "Limited Slip Differential",
    description: "Improves traction and cornering by optimizing power distribution to the wheels.",
    price: 1199.99,
    category: "performance",
    imageUrl: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Subaru WRX 2015-2023", "Subaru STI 2015-2023"],
    inStock: false,
  },
];

export const aftermarketParts: Product[] = [
  {
    id: "after-001",
    name: "Replacement Headlight Assembly",
    description: "Direct replacement for damaged or worn headlight assemblies.",
    price: 249.99,
    category: "aftermarket",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Toyota Camry 2018-2023", "Toyota Corolla 2018-2023"],
    inStock: true,
    featured: true,
  },
  {
    id: "after-002",
    name: "Brake Pad Set",
    description: "Premium ceramic brake pads for quiet, dust-free braking performance.",
    price: 89.99,
    category: "aftermarket",
    imageUrl: "https://images.unsplash.com/photo-1635770311293-b9f546a259ce?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Honda Accord 2016-2023", "Honda Civic 2016-2023"],
    inStock: true,
  },
  {
    id: "after-003",
    name: "Oil Filter",
    description: "High-quality oil filter for optimal engine protection.",
    price: 12.99,
    category: "aftermarket",
    imageUrl: "https://images.unsplash.com/photo-1635773054018-22deda3fb99a?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Multiple vehicle applications"],
    inStock: true,
  },
  {
    id: "after-004",
    name: "Spark Plug Set",
    description: "Iridium spark plugs for improved fuel efficiency and engine performance.",
    price: 49.99,
    category: "aftermarket",
    imageUrl: "https://images.unsplash.com/photo-1600709406925-ef2049e82151?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Multiple vehicle applications"],
    inStock: true,
  },
  {
    id: "after-005",
    name: "Air Filter",
    description: "Replacement air filter for clean airflow to the engine.",
    price: 24.99,
    category: "aftermarket",
    imageUrl: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Multiple vehicle applications"],
    inStock: true,
    featured: true,
  },
  {
    id: "after-006",
    name: "Wiper Blade Set",
    description: "All-season wiper blades for clear visibility in any weather condition.",
    price: 34.99,
    category: "aftermarket",
    imageUrl: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1200&q=80",
    compatibility: ["Multiple vehicle applications"],
    inStock: true,
  },
];

export const serviceTypes = [
  {
    id: "service-001",
    name: "Oil Change",
    description: "Complete oil and filter change with multi-point inspection.",
    price: 79.99,
    duration: 60, // minutes
  },
  {
    id: "service-002",
    name: "Brake Service",
    description: "Inspection, pad replacement, and rotor resurfacing as needed.",
    price: 249.99,
    duration: 120,
  },
  {
    id: "service-003",
    name: "Wheel Alignment",
    description: "Computer-aided alignment for optimal handling and tire wear.",
    price: 129.99,
    duration: 90,
  },
  {
    id: "service-004",
    name: "Performance Tuning",
    description: "Custom ECU tuning for improved performance.",
    price: 399.99,
    duration: 180,
  },
  {
    id: "service-005",
    name: "Suspension Installation",
    description: "Professional installation of aftermarket suspension components.",
    price: 499.99,
    duration: 240,
  },
  {
    id: "service-006",
    name: "Diagnostic Service",
    description: "Comprehensive diagnostic scan and troubleshooting.",
    price: 99.99,
    duration: 60,
  },
];

export const availableTimeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

// Helper function to get all products
export const getAllProducts = (): Product[] => {
  return [...performanceParts, ...aftermarketParts];
};

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return getAllProducts().filter(product => product.featured);
};

// Helper function to get discounted products with their discount percentages
export const getDiscountedProducts = (): { product: Product; discountPercentage: number }[] => {
  // For demonstration purposes, we're applying discounts to specific products
  // In a real application, this might come from a database or API
  return [
    { product: getProductById("perf-001")!, discountPercentage: 15 },
    { product: getProductById("perf-003")!, discountPercentage: 20 },
    { product: getProductById("after-001")!, discountPercentage: 10 },
    { product: getProductById("after-005")!, discountPercentage: 25 },
  ];
};
