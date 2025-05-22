export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'performance' | 'aftermarket';
  imageUrl: string;
  compatibility?: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ServiceBooking {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    vin?: string;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
