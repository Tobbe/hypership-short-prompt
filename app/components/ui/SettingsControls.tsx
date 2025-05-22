"use client";

import { useSettings, Language } from "@/app/lib/settingsContext";
import { useState, useRef, useEffect } from "react";

export default function SettingsControls() {
  const { language, setLanguage, showVAT, toggleVAT } = useSettings();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: "sv", label: "Svenska", flag: "🇸🇪" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const currentLanguage = languageOptions.find((option) => option.code === language);

  return (
    <div className="flex items-center space-x-4">
      {/* VAT Toggle */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-2">
          {language === "sv"
            ? "Visa priser"
            : language === "de"
            ? "Preise anzeigen"
            : language === "fr"
            ? "Afficher les prix"
            : "Show prices"}
        </span>
        <button
          onClick={toggleVAT}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
            showVAT ? "bg-blue-600" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={showVAT}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              showVAT ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm text-gray-600 ml-2">
          {showVAT
            ? language === "sv"
              ? "inkl. moms"
              : language === "de"
              ? "inkl. MwSt"
              : language === "fr"
              ? "TTC"
              : "incl. VAT"
            : language === "sv"
            ? "exkl. moms"
            : language === "de"
            ? "exkl. MwSt"
            : language === "fr"
            ? "HT"
            : "excl. VAT"}
        </span>
      </div>

      {/* Language Selector */}
      <div className="relative" ref={languageMenuRef}>
        <button
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md px-2 py-1"
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span>{currentLanguage?.code.toUpperCase()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${
              languageMenuOpen ? "rotate-180" : ""
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

        {/* Language Dropdown Menu */}
        {languageMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 py-1">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => {
                  setLanguage(option.code);
                  setLanguageMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                  language === option.code ? "text-blue-600 font-medium" : "text-gray-700"
                }`}
              >
                <span className="text-lg">{option.flag}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
