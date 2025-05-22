"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { NavigationCategory } from "@/app/lib/navigationData";

interface MobileNavigationProps {
  navigation: NavigationCategory[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({
  navigation,
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [openSubcategories, setOpenSubcategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleSubcategory = (subcategoryName: string) => {
    setOpenSubcategories((prev) =>
      prev.includes(subcategoryName)
        ? prev.filter((name) => name !== subcategoryName)
        : [...prev, subcategoryName]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Menu</h2>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
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

      <div className="py-2 px-4 space-y-1">
        {navigation.map((category) => (
          <div key={category.name} className="py-2">
            <div className="flex items-center justify-between">
              <Link
                href={category.href}
                className="text-base font-medium text-gray-900 hover:text-blue-600"
                onClick={onClose}
              >
                {category.name}
              </Link>
              {category.subcategories && (
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => toggleCategory(category.name)}
                >
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      openCategories.includes(category.name) ? "rotate-180" : ""
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
                </button>
              )}
            </div>

            {/* First level subcategories */}
            {category.subcategories && openCategories.includes(category.name) && (
              <div className="mt-2 pl-4 space-y-2">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.name} className="py-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={subcategory.href}
                        className="text-sm font-medium text-gray-800 hover:text-blue-600"
                        onClick={onClose}
                      >
                        {subcategory.name}
                      </Link>
                      {subcategory.subcategories && (
                        <button
                          type="button"
                          className="p-1 text-gray-400 hover:text-gray-500"
                          onClick={() => toggleSubcategory(subcategory.name)}
                        >
                          <svg
                            className={`h-4 w-4 transition-transform ${
                              openSubcategories.includes(subcategory.name)
                                ? "rotate-180"
                                : ""
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
                        </button>
                      )}
                    </div>

                    {/* Second level subcategories */}
                    {subcategory.subcategories &&
                      openSubcategories.includes(subcategory.name) && (
                        <ul className="mt-2 pl-4 space-y-2">
                          {subcategory.subcategories.map((subSubcategory) => (
                            <li key={subSubcategory.name}>
                              <Link
                                href={subSubcategory.href}
                                className="text-sm text-gray-600 hover:text-blue-600"
                                onClick={onClose}
                              >
                                {subSubcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}

                {/* Featured items in mobile view */}
                {category.featured && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Featured
                    </h3>
                    <ul className="space-y-2">
                      {category.featured.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-blue-600"
                            onClick={onClose}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
