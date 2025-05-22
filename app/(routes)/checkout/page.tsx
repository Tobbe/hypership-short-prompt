"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { useCart } from "@/app/lib/cartContext";
import { formatPrice, generateOrderId } from "@/app/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sweden",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate shipping cost (free over 1000 SEK)
  const shippingCost = subtotal > 1000 ? 0 : 99;
  
  // Calculate total
  const total = subtotal + shippingCost;

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/");
    }
  }, [mounted, items, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      "firstName", "lastName", "email", "phone", 
      "address", "city", "postalCode", "country"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    if (formData.phone && !/^[+\d\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    // Postal code validation
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid postal code (5 digits)";
    }
    
    // Payment method validation
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = "Please use format MM/YY";
      }
      
      if (!formData.cardCvc) {
        newErrors.cardCvc = "CVC is required";
      } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = "Please enter a valid CVC";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart and redirect to success page
      clearCart();
      
      // Generate a random order ID
      const orderId = generateOrderId();
      
      // Redirect to a success page (you would create this)
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 2000);
  };

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

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.firstName ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.lastName ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.phone ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Shipping Address</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`block w-full rounded-md border ${
                        errors.address ? "border-red-300" : "border-gray-300"
                      } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.city ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Postal Code*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.postalCode ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`block w-full rounded-md border ${
                          errors.country ? "border-red-300" : "border-gray-300"
                        } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                      >
                        <option value="Sweden">Sweden</option>
                        <option value="Norway">Norway</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Finland">Finland</option>
                      </select>
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method*
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="card"
                            name="paymentMethod"
                            type="radio"
                            value="card"
                            checked={formData.paymentMethod === "card"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            htmlFor="card"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Credit/Debit Card
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="paypal"
                            name="paymentMethod"
                            type="radio"
                            value="paypal"
                            checked={formData.paymentMethod === "paypal"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            htmlFor="paypal"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            PayPal
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="klarna"
                            name="paymentMethod"
                            type="radio"
                            value="klarna"
                            checked={formData.paymentMethod === "klarna"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            htmlFor="klarna"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Klarna
                          </label>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4 border-t border-gray-200 pt-4">
                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Card Number*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className={`block w-full rounded-md border ${
                              errors.cardNumber ? "border-red-300" : "border-gray-300"
                            } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="cardExpiry"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Expiry Date*
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className={`block w-full rounded-md border ${
                                errors.cardExpiry ? "border-red-300" : "border-gray-300"
                              } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                            />
                            {errors.cardExpiry && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="cardCvc"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              CVC*
                            </label>
                            <input
                              type="text"
                              id="cardCvc"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              placeholder="123"
                              className={`block w-full rounded-md border ${
                                errors.cardCvc ? "border-red-300" : "border-gray-300"
                              } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                            />
                            {errors.cardCvc && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "paypal" && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">
                          You will be redirected to PayPal to complete your payment.
                        </p>
                      </div>
                    )}

                    {formData.paymentMethod === "klarna" && (
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600">
                          You will be redirected to Klarna to complete your payment.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Link href="/cart">
                  <Button variant="outline">
                    Back to Cart
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : `Pay ${formatPrice(total)}`}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0
                        ? "Free"
                        : formatPrice(shippingCost)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
