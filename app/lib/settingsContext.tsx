"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "sv" | "en" | "de" | "fr";

export interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  showVAT: boolean;
  toggleVAT: () => void;
  vatRate: number;
}

const defaultSettings: Omit<SettingsContextType, "setLanguage" | "toggleVAT"> = {
  language: "sv",
  showVAT: true,
  vatRate: 0.25, // 25% VAT rate in Sweden
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(defaultSettings.language);
  const [showVAT, setShowVAT] = useState<boolean>(defaultSettings.showVAT);
  const [mounted, setMounted] = useState(false);

  // Initialize settings from localStorage on client side
  useEffect(() => {
    setMounted(true);
    const storedSettings = localStorage.getItem("acm-settings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setLanguage(parsedSettings.language || defaultSettings.language);
        setShowVAT(
          parsedSettings.showVAT !== undefined
            ? parsedSettings.showVAT
            : defaultSettings.showVAT
        );
      } catch (error) {
        console.error("Failed to parse settings from localStorage:", error);
        localStorage.removeItem("acm-settings");
      }
    }
  }, []);

  // Update localStorage when settings change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(
        "acm-settings",
        JSON.stringify({ language, showVAT })
      );
    }
  }, [language, showVAT, mounted]);

  const toggleVAT = () => {
    setShowVAT((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        showVAT,
        toggleVAT,
        vatRate: defaultSettings.vatRate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
