"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { serviceTypes } from "@/app/lib/mockData";
import { generateDateRange } from "@/app/lib/utils";
import { formatPrice } from "@/app/lib/utils";

export default function ServiceBookingForm() {
  const router = useRouter();
  const availableDates = generateDateRange(14);
  const availableTimeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];

  const [formData, setFormData] = useState({
    serviceType: "",
    date: "",
    time: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleVin: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      "serviceType", "date", "time", "vehicleMake", 
      "vehicleModel", "vehicleYear", "customerName", 
      "customerEmail", "customerPhone"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });
    
    // Email validation
    if (formData.customerEmail && !/^\S+@\S+\.\S+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address";
    }
    
    // Phone validation
    if (formData.customerPhone && !/^[+\d\s()-]{7,20}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = "Please enter a valid phone number";
    }
    
    // Year validation
    if (formData.vehicleYear) {
      const year = parseInt(formData.vehicleYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 1) {
        newErrors.vehicleYear = `Please enter a year between 1900 and ${currentYear + 1}`;
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to confirmation page after a delay
      setTimeout(() => {
        router.push("/service-booking/confirmation");
      }, 2000);
    }, 1500);
  };

  const selectedService = serviceTypes.find(
    (service) => service.id === formData.serviceType
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {isSuccess ? (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Booking Successful!
          </h2>
          <p className="mt-2 text-gray-600">
            Your service appointment has been scheduled. Redirecting to confirmation page...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Schedule Your Service Appointment
            </h2>
          </div>

          {/* Service Selection */}
          <div>
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Type*
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`block w-full rounded-md border ${
                errors.serviceType ? "border-red-300" : "border-gray-300"
              } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            >
              <option value="">Select a service</option>
              {serviceTypes.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - {formatPrice(service.price)}
                </option>
              ))}
            </select>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
            )}
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date*
              </label>
              <select
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.date ? "border-red-300" : "border-gray-300"
                } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
              >
                <option value="">Select a date</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </option>
                ))}
              </select>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time*
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`block w-full rounded-md border ${
                  errors.time ? "border-red-300" : "border-gray-300"
                } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="vehicleMake"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Make*
                </label>
                <input
                  type="text"
                  id="vehicleMake"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.vehicleMake ? "border-red-300" : "border-gray-300"
                  } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                  placeholder="e.g., BMW"
                />
                {errors.vehicleMake && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vehicleMake}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="vehicleModel"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Model*
                </label>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.vehicleModel ? "border-red-300" : "border-gray-300"
                  } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                  placeholder="e.g., M3"
                />
                {errors.vehicleModel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vehicleModel}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="vehicleYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Year*
                </label>
                <input
                  type="text"
                  id="vehicleYear"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.vehicleYear ? "border-red-300" : "border-gray-300"
                  } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                  placeholder="e.g., 2023"
                />
                {errors.vehicleYear && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vehicleYear}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="vehicleVin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                VIN (Optional)
              </label>
              <input
                type="text"
                id="vehicleVin"
                name="vehicleVin"
                value={formData.vehicleVin}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Vehicle Identification Number"
              />
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.customerName ? "border-red-300" : "border-gray-300"
                  } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customerEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.customerEmail ? "border-red-300" : "border-gray-300"
                  } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                />
                {errors.customerEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customerEmail}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="customerPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.customerPhone ? "border-red-300" : "border-gray-300"
                  } py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                />
                {errors.customerPhone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customerPhone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Service Summary */}
          {selectedService && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Service Summary
              </h3>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-700">{selectedService.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedService.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {selectedService.duration} minutes
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(selectedService.price)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
