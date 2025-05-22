"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavigationCategory } from "@/app/lib/navigationData";

interface MegaMenuProps {
  navigation: NavigationCategory[];
}

export default function MegaMenu({ navigation }: MegaMenuProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleCategoryHover = (categoryName: string) => {
    setOpenCategory(categoryName);
  };

  const handleMenuLeave = () => {
    setOpenCategory(null);
  };

  return (
    <div className="relative bg-white">
      <div className="flex justify-center">
        <nav
          className="hidden lg:flex space-x-8"
          onMouseLeave={handleMenuLeave}
        >
          {navigation.map((category) => (
            <div key={category.name} className="relative flex items-center">
              <button
                className={`px-3 py-4 text-sm font-medium transition-colors ${
                  openCategory === category.name
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onMouseEnter={() => handleCategoryHover(category.name)}
                onClick={() => {
                  if (openCategory === category.name) {
                    setOpenCategory(null);
                  } else {
                    setOpenCategory(category.name);
                  }
                }}
              >
                {category.name}
                <span className="ml-1">
                  <svg
                    className={`h-4 w-4 inline-block transition-transform ${
                      openCategory === category.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {/* Dropdown for category with subcategories */}
              {category.subcategories && openCategory === category.name && (
                <div
                  className="fixed top-[var(--header-height,4rem)] left-0 right-0 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-b-lg z-50 overflow-y-auto max-h-[80vh]"
                  style={{ 
                    maxWidth: "min(95vw, 1280px)",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                  onMouseEnter={() => handleCategoryHover(category.name)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 py-8">
                    {/* Main subcategories */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.name}>
                          <Link
                            href={subcategory.href}
                            className="font-medium text-gray-900 hover:text-blue-600"
                          >
                            {subcategory.name}
                          </Link>
                          {subcategory.subcategories && (
                            <ul className="mt-4 space-y-3">
                              {subcategory.subcategories.map((subSubcategory) => (
                                <li key={subSubcategory.name} className="text-sm">
                                  <Link
                                    href={subSubcategory.href}
                                    className="text-gray-600 hover:text-blue-600"
                                  >
                                    {subSubcategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Featured items */}
                    {category.featured && (
                      <div className="col-span-1">
                        <h3 className="font-medium text-gray-900 mb-4">Featured</h3>
                        <div className="space-y-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group">
                              <div className="relative h-36 w-full overflow-hidden rounded-lg">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  fill
                                  className="object-cover group-hover:opacity-75"
                                  sizes="(max-width: 768px) 100vw, 300px"
                                />
                              </div>
                              <Link
                                href={item.href}
                                className="mt-2 block text-sm font-medium text-gray-900 hover:text-blue-600"
                              >
                                {item.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
